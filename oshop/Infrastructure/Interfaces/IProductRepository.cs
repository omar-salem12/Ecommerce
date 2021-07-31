using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers;
using Core.Entities;
using Core.Helpers;

namespace Core
{
    public interface IProductRepository
    {
        
        Task<PagedList<ProductToReturnDto>> GetProductsAsync(UserParams userParams);

        Task<Product> GetProductByIdAsync(int id);
       

       Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();


       Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
    }
}