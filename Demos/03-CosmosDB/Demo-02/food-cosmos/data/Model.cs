// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Serving
    {
        public string type { get; set; }
        public string size { get; set; }
    }

    public class Food
    {
        public string id { get; set; }
        public string name { get; set; }
        public int amount { get; set; }
        public string pictureUrl { get; set; }
        public string code { get; set; }
        public DateTime date { get; set; }
        public string kitchen { get; set; }
        public List<string> tags { get; set; }
        public List<string> protein { get; set; }
        public List<Serving> servings { get; set; }
        public int reviews { get; set; }
    }

