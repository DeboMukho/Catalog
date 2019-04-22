function onLoad (done) {
    getProductInfoData('productData.json', function(response) {
        var data = response;
        var productDiv = "<div class='productItem'>";
        data.groups.forEach((val, key) => {
            productDiv += "<div class='productItemInside col-lg-4 col-md-4 col-sm-12 col-xs-12'>" +
                "<div class='productItemDescription'>" +
                "<img id="+'image'+key+" src="+val.hero.href+" />" +
                "<h5 class='productHeader'>"+val.name+"</h5>" +
                "<div class='productPrice'>"+val.priceRange.selling.high+"</div>" +
                "</div> </div>";
        });
        productDiv += "</div>";
        document.getElementById("mainProduct").innerHTML = productDiv;
        data.groups.forEach((val, key) => {
            document.getElementById('image'+key).addEventListener('click', productCallBack(val));
        });
        if (done) done();
    });
}

function getProductInfoData(url, productCallback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            productCallback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function setProductAttributes (el, attrs){
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};
function closeProductModal() {
    document.getElementsByClassName("containerProductInner")[0].style.display = 'none';
    document.getElementsByClassName("productBackdrop")[0].style.display = 'none';
};
function productCallBack(data){
    return function(){
        document.getElementsByClassName("containerProductInner")[0].style.display = 'block';
        document.getElementsByClassName("productBackdrop")[0].style.display = 'block';
         document.getElementsByClassName("containerProductInner")[0].innerHTML = '';
         var carouselElement = document.createElement('div');
         setProductAttributes(carouselElement, {'id': 'myCarousel', 'class': 'carousel slide', 'data-ride': "carousel"});
        var imagesList = "<div class='carousel-inner'>";
        var slideIndicators = "<ol class='carousel-indicators'>";
        data.images.forEach((val, key) => {
            imagesList += "<div class='item'><img src="+val.href+" style='width:100%';/></div>";
            slideIndicators += "<li class='indicator' data-target='#myCarousel' data-slide-to="+key+"></li>";
        });
        imagesList += "</div>";
        slideIndicators += "</ol>";
        carouselElement.innerHTML += "<button class='close productCloseBtn' data-dismiss='carousel' type='button'" +
            "onclick='closeProductModal()'>x</button>";
            carouselElement.innerHTML += imagesList;

        var leftIcon = setProductIcons('left', 'Previous', 'prev');
        var rightIcon = setProductIcons('right', 'Next', 'next');
        if(data.images.length>1){
            carouselElement.innerHTML += leftIcon;
            carouselElement.innerHTML += rightIcon;
            carouselElement.innerHTML += slideIndicators;
        }
        document.getElementsByClassName("containerProductInner")[0].appendChild(carouselElement);
        document.getElementsByClassName("item")[0].classList = 'item active';
        document.getElementsByClassName("indicator")[0].classList = 'indicator active';
    }
}
function setProductIcons(cls, navigation, navigator) {
    if(cls === 'left') {
        return "<a class= 'left carousel-control' href='#myCarousel' data-slide="+navigator+">" +
            "<span class='glyphicon glyphicon-chevron-left'></span>" +
            "<span class='sr-only'>"+navigation+"</span>"+
            "</a>";
    } else {
        return "<a class= 'right carousel-control' href='#myCarousel' data-slide="+navigator+">" +
        "<span class='glyphicon glyphicon-chevron-right'></span>" +
        "<span class='sr-only'>"+navigation+"</span>"+
        "</a>";
    }
}
