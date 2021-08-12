using System.Collections.Generic;
using Core.Entities;

namespace Infrastructure.Dtos
{
    public class CustomerBasketDto
    {
        public string Id { get; set; }

        public List<BasketItemDto> Items { get; set; }
    }
}