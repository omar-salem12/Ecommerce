using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extentions
{
    public  static class HttpExtentions
    {
        public static void AddPaginationHeaders(this HttpResponse response, int currentPage, 
                                                    int itemsPerPage,int totalItem, int totalPages)
         {

                  
              var PaginationHeader = new PaginationHeaders(currentPage, itemsPerPage, totalItem,totalPages);
              response.Headers.Add("Pagination",JsonSerializer.Serialize(PaginationHeader));
              response.Headers.Add("Access-Control-Expose-Header","Pagination");
        }
    }
}