namespace FoodApp
{
    public class CatalogItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int InStock { get; set; } 
        public string PictureUrl { get; set; }
        public string Description { get; set; }
    }
}