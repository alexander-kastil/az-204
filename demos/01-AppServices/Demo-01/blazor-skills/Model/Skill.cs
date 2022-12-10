    public class Skill
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Hours { get; set; }
        public bool Completed { get; set; }
        public string Url{
            get{
                return "skill-edit/" + this.ID;
            }
        }
    }