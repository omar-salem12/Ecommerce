using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using API.Helpers;
using Core;
using Core.Entities;
using Core.Helpers;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.Dtos;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _storeContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public ProductRepository(StoreContext storecontext, IMapper mapper, IConfiguration config)
        {
            _storeContext = storecontext;
            _mapper = mapper;
            _config = config;
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
           return await _storeContext.ProductBrands.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _storeContext.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .SingleOrDefaultAsync(p => p.Id == id);
          
        }

        public async Task<PagedList<ProductToReturnDto>> GetProductsAsync(UserParams userParams)
        {


            var query =  _storeContext.Products.AsQueryable();

            query = userParams.OrderBy switch {
                 "priceAsc" => query.OrderBy(p => p.Price),
                 "priceDes" => query.OrderByDescending( p =>p.Price),
                 _ => query.OrderBy(p =>p.Name)
            };
            

            if(userParams.TypeId != null) 
            {
                query = query.Where( p => p.ProductTypeId == userParams.TypeId);
            }

            if(userParams.BrandId != null) {
                query = query.Where(p => p.ProductBrandId == userParams.BrandId);
            }

            if(userParams.search != null) 
            {
                
                 query = query.Where(p => p.Name.ToLower().Contains(userParams.search));
            }


          var   query2 =  query.Include(p => p.ProductType).Include(p =>p.ProductBrand).Select(p => new ProductToReturnDto{
                Id=p.Id,
               Name = p.Name,
               Description = p.Description,
               Price = p.Price,
               PictureUrl= _config["APiUrl"] + p.PictureUrl,
               ProductType = p.ProductType.Name,
               ProductBrand = p.ProductBrand.Name

            });

            return await PagedList<ProductToReturnDto>.CreateAsync(query2,userParams.PageNumber,userParams.PageSize);


           

        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _storeContext.ProductTypes.ToListAsync();
        }
    }
}