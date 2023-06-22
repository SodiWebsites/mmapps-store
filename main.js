const fetchProducts = async () => {
    const response = await fetch('https://645c6d70e01ac6105889a3e9.mockapi.io/api/v1/products');
    var products = await response.json();
    insertProductToPage(products);
}

const insertProductToPage = (products) => {
    var productListId = "product-list";
    var productList = document.getElementById(productListId);

    for(var i=0; i<products.length; i++) {
        var product = products[i];

        var cardColumn = document.createElement("div");
        cardColumn.className = "col mb-5";

        var cardProduct = document.createElement("div");
        cardProduct.className = "card h-100";

        // Badges
        if(product.badges && product.badges.length > 0) {
            var badges = product.badges;
            var rightSpaceStandard = 0.5;
            var topSpaceStandard = 0.5;
            var rightSpaceJump = 2.5;

            for(var badgeIndex = 0; badgeIndex < badges.length; badgeIndex++) {
                var badge = document.createElement("div");
                badge.className = "badge position-absolute";

                badge.textContent = badges[badgeIndex].name;
                badge.style.top = `${topSpaceStandard}rem`;
                badge.style.right = `${rightSpaceStandard + rightSpaceJump*badgeIndex}rem`;
                badge.style.color = badges[badgeIndex].textColor;
                badge.style.backgroundColor = badges[badgeIndex].backgroundColor;

                cardProduct.appendChild(badge);
            }
        }

        // Image
        var productImage = document.createElement("img");
        productImage.className = "card-img-top";
        productImage.src = product.image;
        productImage.alt = `${product.name} - MMApps.store`;
        cardProduct.appendChild(productImage);

        // Product details
        var cardBody = document.createElement("div");
        cardBody.className = "card-body p-4";
        var cardBodyText = document.createElement("div");
        cardBodyText.className = "text-center";

        var productName = document.createElement("h5");
        productName.className = "fw-bolder";
        productName.textContent = product.name;
        cardBodyText.appendChild(productName);
        
        var productStar = document.createElement("div");
        productStar.className = "d-flex justify-content-center small text-warning mb-2";
        for(var starIndex = 0; starIndex < product.stars.length; starIndex++) {
            var starValue = product.stars[starIndex];
            var star = document.createElement("div");
            switch(starValue) {
                case 0: star.className = "bi-star"; break;
                case 1: star.className = "bi-star-fill"; break;
                case 0.5: star.className = "bi-star-half"; break;
                default: star.className = "bi-star-fill"; break;
            }
            productStar.appendChild(star);
        }
        cardBodyText.appendChild(productStar);

        var productPrice = document.createElement("div");
        if(product.isFree) {
            productPrice.textContent = "Free";
        } else {
            if(product.price) {
                if(product.price.original) {
                    var originalPrice = document.createElement("span");
                    originalPrice.className = "text-muted text-decoration-line-through";
                    originalPrice.textContent = product.price.original;
                    productPrice.appendChild(originalPrice);
                }
                var currentPrice = document.createElement("span");
                currentPrice.textContent = product.price.current;
                productPrice.appendChild(currentPrice);
            } else {
                productPrice.textContent = "Coming soon...";
            }
        }
        cardBodyText.appendChild(productPrice);

        cardBody.appendChild(cardBodyText);
        cardProduct.appendChild(cardBody);
        // End Product details

        // Download
        var productDownload = document.createElement("div");
        productDownload.className = "card-footer p-4 pt-0 border-top-0 bg-transparent";
        var productDownloadText = document.createElement("div");
        productDownloadText.className = "text-center";
        var productDownloadLink = document.createElement("a");
        productDownloadLink.className = "btn btn-outline-primary mt-auto";
        productDownloadLink.href = product.downloadLink;
        productDownloadLink.textContent = "Download";
        productDownloadText.appendChild(productDownloadLink);
        productDownload.appendChild(productDownloadText);
        cardProduct.appendChild(productDownload);

        cardColumn.appendChild(cardProduct);
        productList.appendChild(cardColumn);
    }
}

fetchProducts();

