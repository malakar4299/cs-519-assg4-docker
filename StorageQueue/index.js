const fetch = require("node-fetch");
// const { MongoClient } = require("mongodb");
// const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, message) {
    // const url = process.env.CONNECTION_STRING
    // context.log(url)
    // const client = new MongoClient(url);
    context.log('Node.js queue trigger function processed work item', message);
    // OR access using context.bindings.<name>
    // context.log('Node.js queue trigger function processed work item', context.bindings.myQueueItem);
    context.log('expirationTime =', context.bindingData.expirationTime);
    context.log('insertionTime =', context.bindingData.insertionTime);
    context.log('nextVisibleTime =', context.bindingData.nextVisibleTime);
    context.log('id =', context.bindingData.id);
    context.log('popReceipt =', context.bindingData.popReceipt);
    context.log('dequeueCount =', context.bindingData.dequeueCount);
  
    const headers = {            
        "Ocp-Apim-Subscription-Key": "8ad99c19286f4cfbb1150af98cc2e76e",
        "Content-Type": "application/json"}

    // const fetch = await import('node-fetch');
    const response = await fetch("https://warehouse-am-519.cognitiveservices.azure.com/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview",
        { method: 'POST', headers: headers, 
        body: "{'url':'"+message+"'}"});

    const imageCont = await response.json()
    
    function string_between_strings(startStr, endStr, str) {
        pos = str.indexOf(startStr) + startStr.length;
        return str.substring(pos, str.indexOf(endStr, pos));
    }
    
    const productLabels = ["Product:", "Tag Line:", "Price:", "Size: "]
    
    context.log(imageCont);
    
    var i = 0;
    
    productData = {}
    
    // await client.connect();
    // const database = client.db("Warehouse")
    // const collection = database.collection("Products")
    
    productData['id'] = new Date().toISOString() + Math.random().toString().substring(2, 10)
    
    while(i<productLabels.length){
        context.log(productLabels[i], string_between_strings(productLabels[i],"\n",imageCont.readResult.content))
        productData[productLabels[i].split(":")[0]] = string_between_strings(productLabels[i],"\n",imageCont.readResult.content)
        i++;
    }
    
    // let create = await collection.insert(
    //     {productData}
    // )
    // context.log("client: ", client)
    // if (!create){
    //     context.log("could not create :(")
    // }else{
    //     context.log("created :D")
    // }
    
    // // context.bindings.productImage = JSON.stringify([imageCont]);
    
    context.log(productData)
    
    context.bindings.productImage = JSON.stringify(productData)
};