namespace CosmosReader
{
    public class Product
    {
        public string id {get;set;}
        public int ProductId { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }

        public string ProductNumber { get; set; }

        public Category Category { get; set; }

        public bool Promotion { get; set; }

        public bool Discontinued { get; set; }
    }

    public class Category
    {
        public int CategoryId { get; set; }
    }
}