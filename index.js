const fs = require('fs');
const json2csv = require('json2csv').Parser;
const request = require('request-promise');
const cheerio = require('cheerio');

const productUrls = [
            
            "https://www.staples.com/Bush-Furniture-Cabot-Collection-L-Desk-with-Hutch-Heather-Gray-CAB001HRG/product_2094393",
            "https://www.staples.com/eureka-ergonomic-63-computer-gaming-desk-black-gd0076-bk/product_24502572",
         ];

(async () => {
    let Narray= [];
    for(let productData of productUrls) {
        const response = await request({
            uri:productData,
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,de;q=0.8"
            },
            gzip:true,
        })
        let $ = cheerio.load(response)
        let name = $("#product_title").text();
        let discription = $("#prodParagraph").text()
        let model_number = $("#manufacturer_number").text()
        let price = $(".price-info__final_price_sku").text()
        let item_number = $("#item_number").text()
        console.log(name,price,item_number,model_number)
    
        Narray.push({
            Name:name,
            discription:discription,
            Model_number:model_number,
            Price:price,
            Item_number:item_number,
        })
    }
    const j2cp = new json2csv()
    const csv = j2cp.parse(Narray)

    fs.writeFileSync("./productData.csv",csv , "utf-8")
  }
)();


