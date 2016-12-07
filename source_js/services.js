var ourServices = angular.module('ourServices', []);

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

ourServices.factory('Walmart', function($http, $window){
    var apiKey = "ztckw7sqnfaajaxdah556a5d";

    return{

        //called when search bar is used. create a dictionary after calling this to store key-value pairs in the form itemName-itemID
        searchItem : function(searchTerm){
            var requestURI = "http://api.walmartlabs.com/v1/search?query=" + searchTerm + "&format=json&apiKey=" + apiKey;
            console.log(requestURI);
           // return;

            return $.ajax({
                url: requestURI,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                success: function(data) { return data },
                error: function(data) { return data }
            });

        },


        //call when a specific product is selected, use productID from search request
        productDetails: function(productID){
            var requestURI = "http://api.walmartlabs.com/v1/items/"+productID+"?format=json&apiKey="+apiKey;

            return $.ajax({
                url: requestURI,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                success: function(data) { return data },
                error: function(data) { return data }
            });
        },


        //taxonomy: when user selects find categories, this will display all the available categories
        getCategories: function(){
            var requestURI = "http://api.walmartlabs.com/v1/taxonomy?apiKey="+apiKey;

            return $.ajax({
                url: requestURI,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                success: function(data) { return data },
                error: function(data) { return data }
            });
        },

        //gets paginated products from the selected category. use data.nextPage to go to the next part of the list
        filterByCategory: function(categoryID){
            var requestURI = "http://api.walmartlabs.com/v1/paginated/items?category="+categoryID+"&apiKey="+apiKey;

            return $.ajax({
                url: requestURI,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                success: function(data) { return data },
                error: function(data) { return data }
            });
        },

        //from post browsed products API, returns similar products to current one
        recommendedProducts: function(itemID){
            var requestURI = "http://api.walmartlabs.com/v1/postbrowse?itemId="+itemID+"&apiKey="+apiKey;

            return $.ajax({
                url: requestURI,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                success: function(data) { return data },
                error: function(data) { return data }
            });
        },

        //when users arrive at the feed, show trending items(or their lists)
        trendingProducts: function(){
            var requestURI = "http://api.walmartlabs.com/v1/trends?format=json&apiKey="+apiKey;
            console.log(requestURI);

            return $.ajax({
                url: requestURI,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                jsonpCallback: 'foobar',
                success: function(data) { return data },
                error: function(data) { return data }
            });
        }


    }
});


//MAKE BASEURL THE LINK TO OUR API
ourServices.factory('User', function($http, $window){

    return{

        //give user object to add to database
        addUser : function(user){

            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/users', user);

        },

        //get user information when log in request
        getUser: function(user){

            var baseUrl = $window.sessionStorage.baseurl;

            return $http.get(baseUrl+'/users', user);
        },


        //when user saves (shopping) list we update their information in our database
        saveItems: function(user, list){

            var baseUrl = $window.sessionStorage.baseurl;

            return $http.put(baseUrl+'/users', user);
        }

    }
});
