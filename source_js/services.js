/*

Product lookup
http://api.walmartlabs.com/v1/items/12417832?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&format=json


Search lookup
http://api.walmartlabs.com/v1/search?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=ipod



paginated products(filters and such/catalog)



taxonomy - returns categories might be required. NEEDED FOR FILTER BY CATEGORY



post browsed products api- used to suggest items based on user's product viewing history



product recommendation api - used to get related items to current item



trending api-shows trending items










*/





var speedshopperServices = angular.module('speedshopperServices', []);

speedshopperServices.factory('Walmart', function(){
    var apiKey = "ztckw7sqnfaajaxdah556a5d";

    return{

        //called when search bar is used. create a dictionary after calling this to store key-value pairs in the form itemName-itemID
        searchItem : function(searchTerm){
            var requestURI = "http://api.walmartlabs.com/v1/search?+apiKey="+apiKey+"&numItems=5&query="+searchTerm;

            return $http.get(requestURI);

        },
           

        //call when a specific product is selected, use productID from search request
        productDetails: function(productID){
            var requestURI = "http://api.walmartlabs.com/v1/items/"+productID+"?apiKey="+apiKey+"&format=json";

            return $http.get(requestURI);
        }


        //taxonomy: when user selects find categories, this will display all the available categories
        getCategories: function(){
            var requestURI = "http://api.walmartlabs.com/v1/taxonomy?apiKey="+apiKey;

            return $http.get(requestURI);
        }

        //gets paginated products from the selected category. use data.nextPage to go to the next part of the list
        filterByCategory: function(categoryID){
            var requestURI = "http://api.walmartlabs.com/v1/paginated/items?category="+categoryID+"&apiKey="+apiKey;

            return $http.get(requestURI);
        }

        //from post browsed products API, returns similar products to current one
        recommendedProducts: function(itemID){
            var requestURI = "http://api.walmartlabs.com/v1/postbrowse?apiKey="+apiKey+"&itemId="+itemID;

            return $http.get(requestURI);
        }

        //when users arrive at the feed, show trending items(or their lists)
        trendingProducts: function(itemID){
            var requestURI = "http://api.walmartlabs.com/v1/trends?apiKey="+apiKey;

            return $http.get(requestURI);
        }


    }
});

speedshopperServices.factory('User', function(){
    var mlab = "";

    return{

        //called when search bar is used. create a dictionary after calling this to store key-value pairs in the form itemName-itemID
        searchItem : function(searchTerm){
            var requestURI = "http://api.walmartlabs.com/v1/search?+apiKey="+apiKey+"&numItems=5&query="+searchTerm;

            return $http.get(requestURI);

        },
           

        //call when a specific product is selected, use productID from search request
        productDetails: function(productID){
            var requestURI = "http://api.walmartlabs.com/v1/items/"+productID+"?apiKey="+apiKey+"&format=json";

            return $http.get(requestURI);
        }


        //taxonomy: when user selects find categories, this will display all the available categories
        getCategories: function(){
            var requestURI = "http://api.walmartlabs.com/v1/taxonomy?apiKey="+apiKey;

            return $http.get(requestURI);
        }

        //gets paginated products from the selected category. use data.nextPage to go to the next part of the list
        filterByCategory: function(categoryID){
            var requestURI = "http://api.walmartlabs.com/v1/paginated/items?category="+categoryID+"&apiKey="+apiKey;

            return $http.get(requestURI);
        }

        //from post browsed products API, returns similar products to current one
        recommendedProducts: function(itemID){
            var requestURI = "http://api.walmartlabs.com/v1/postbrowse?apiKey="+apiKey+"&itemId="+itemID;

            return $http.get(requestURI);
        }

        //when users arrive at the feed, show trending items(or their lists)
        trendingProducts: function(itemID){
            var requestURI = "http://api.walmartlabs.com/v1/trends?apiKey="+apiKey;

            return $http.get(requestURI);
        }


    }
});

//