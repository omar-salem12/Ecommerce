using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core;
using API.Dtos;

using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;

using Core.Helpers;
using API.Helpers;
using API.Extentions;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productsRepo;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository productsRepo, IMapper mapper)
        {
            _productsRepo = productsRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ProductToReturnDto>>> GetProducts([FromQuery] UserParams userParams)
        {
            var products = await _productsRepo.GetProductsAsync(userParams);
            Response.AddPaginationHeaders(products.CurrentPage,products.PageSize,products.TotalCount,products.TotalPages);
            return Ok(products);
            
            //return Ok(_mapper.Map<PagedList<Product>, PagedList<ProductToReturnDto>>(products));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
                var product = await _productsRepo.GetProductByIdAsync(id);
                if(product == null) return NotFound( new ApiResponse(404));
                 return _mapper.Map<Product,ProductToReturnDto>(product);
     
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
             return Ok(await _productsRepo.GetProductBrandsAsync());
        }


         [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
             return Ok(await _productsRepo.GetProductTypesAsync());
        }





    }
}