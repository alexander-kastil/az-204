
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const food =  `<?xml version="1.0" encoding="UTF-8"?>
    <root>
       <element>
          <calories>1200</calories>
          <id>1</id>
          <name>Butter Chicken</name>
          <price>9</price>
       </element>
       <element>
          <calories>730</calories>
          <id>2</id>
          <name>Curry Wurst</name>
          <price>2.7</price>
       </element>
       <element>
          <calories>600</calories>
          <id>3</id>
          <name>Blini with Salmon</name>
          <price>8.3</price>
       </element>
    </root>`

    context.res = {
        body: food,
        contentType: "application/xml"
    };
}