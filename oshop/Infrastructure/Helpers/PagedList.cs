using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
  
         public class PagedList<T> 
    {
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalPages =(int)Math.Ceiling(count / (double)pageSize);
           

          

               this.items = items;


              
        }


               
         // public PaginationHeaders paginationsMetaData { get; set; }
          
            public int TotalCount { get; set; }

            public int PageNumber { get; set; }

            public int PageSize { get; set; }

            public int TotalPages { get; set; }

          public IEnumerable<T> items { get; set; }

          public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int PageNumber,int PageSize) 
          {
               var count = await source.CountAsync();

               var items = await source.Skip((PageNumber -1) * PageSize).Take(PageSize).ToListAsync();

               return new PagedList<T>(items, count, PageNumber,PageSize);
          }
        
   
    }
}