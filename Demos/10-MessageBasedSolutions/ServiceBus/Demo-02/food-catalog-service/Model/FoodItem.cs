using System;

namespace FoodApp.CatalogService
{
    public class FoodItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal BasePrice { get; set; }
        public int StockAmount {get;set;}
        public string PictureUrl { get; set; }
        public string Code { get; set; }
    }
}