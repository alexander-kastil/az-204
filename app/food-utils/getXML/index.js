module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const xml = '<?xml version="1.0" encoding="UTF-8" ?><root><row><id>1</id><name>Butter Chicken</name><price>12</price><calories>1200</calories></row><row><id>2</id><name>Blini with Salmon</name><price>9</price><calories>900</calories></row><row><id>3</id><name>Wurstknödel mit Sauerkraut</name><price>8</price><calories>1250</calories></row></root>';
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: xml
    };
}