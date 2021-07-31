namespace API.Helpers
{
    public class PaginationHeaders
    {
        public PaginationHeaders(int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {

            CurrentPage = currentPage;
            ItemsPerPage = itemsPerPage;
            TotalItems = totalItems;
            TotalPages = totalItems;
        }

        public int CurrentPage { get; set; }

        public int ItemsPerPage { get; set; }

        public int TotalItems { get; set; }

        public int TotalPages { get; set; }
    }
}