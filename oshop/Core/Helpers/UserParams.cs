namespace Core.Helpers
{
    public class UserParams
    {
        public string OrderBy { get; set; } = "name";

        public int? TypeId { get; set; }

        public int? BrandId { get; set; }

           private const int MaxPageSize = 50;

           public int PageNumber { get; set; }  = 1;

           private int _pageSize = 10;

           public int PageSize
           {
               get => _pageSize;
               set => _pageSize =(value > MaxPageSize) ? MaxPageSize : value;
           }

           
           private string _search;
           public string search { 
               get => _search;
               set => _search = value.ToLower();
            }
    }
}