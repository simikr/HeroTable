$(document).ready(function () {
    window.oncontextmenu = function () {
        if (event.button != 2 && !(event.clientX == event.clientY == 1)) {
            alert('Disabled');
        }
    }
    var timerSet = false;
    var idleTimerRecurring = null;

    init();

    $(document).bind('click dragstart touchstart mouseover keypress tap swipe scrollstart orientationchange', function (e) {
        if (timerSet) {
            
            clearTimeout(idleTimerRecurring);
            timerSet = false;
        }

        if (!timerSet) {
            //alert('timeout');
            idleTimerRecurring = setTimeout(function ()
            {
                window.location.reload();
            }, parseInt(defaultIdleLimit) * 1000);
            timerSet = true;
        }
    });

    document.addEventListener('touchmove', e => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false })

    $('.content-body__product-item').each(function (index) {
       
    });

    $('[data-product-main]').on('click touchstart', function () {
        $(this).parents('.content-body__product-item').addClass('content-body__product-item--active');
        $('[data-swipe]').hide();
        $('[data-product]').show();
    })
    var commonvar2 = false;
    $('[data-change-image]').on('dragstart', function (event) {
        commonvar2 = true;
        event.stopPropagation();
        event.stopImmediatePropagation();
        var src = $('[data-change-image]').attr('src');
        var image = (src == 'images/setting.png') ? 'images/setting-white.png' : 'images/setting.png';
        $('[data-change-image]').attr('src', image);

        $('[data-change-text]').text() === 'Swipe up to configure' ? $('[data-change-text]').text('Hide configuration') : $('[data-change-text]').text('Swipe up to configure')

        $(this).parents('[data-configration]').toggleClass('active');
        $('.p-item__large').toggleClass('active');
        $('.p-item__large-image img').toggleClass('active');
    })

    $('[data-change-image]').on('dragend', function (event) {

        var delaytimeout = null;
        delaytimeout = setTimeout(function () {

            commonvar2 = false;
        }, 1000);
    });

    $('[data-change-image]').on('click touchstart', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        if (commonvar2) return;
        var src = $('[data-change-image]').attr('src');
        var image = (src == 'images/setting.png') ? 'images/setting-white.png' : 'images/setting.png';
        $('[data-change-image]').attr('src', image);

        $('[data-change-text]').text() === 'Swipe up to configure' ? $('[data-change-text]').text('Hide configuration') : $('[data-change-text]').text('Swipe up to configure')

        $(this).parents('[data-configration]').toggleClass('active');
        $('.p-item__large').toggleClass('active');
        $('.p-item__large-image img').toggleClass('active');
    })

    //var commonvarsetd = false;
    //$('[data-set-device]').on('click dragstart', function () {
       
    //    commonvarsetd = true;
    //    //event.stopPropagation();
    //    //event.stopImmediatePropagation();
    //    $('[data-change-textswipeup]').text() === 'Swipe up to set devices' ? $('[data-change-textswipeup]').text('Set up your devices') : $('[data-change-textswipeup]').text('Swipe up to set devices')
    //    $(this).toggleClass('active');

    //    if ($('[data-set-swapdevice-toggle]').hasClass('set-swapdevice__toggle--active')) {
    //        $('[data-set-swapdevice-toggle]').toggleClass('set-swapdevice__toggle--active');
    //        $('[data-compare-product-back]').show();
    //        $('[data-compare-product-close]').hide();
    //    }
    //    else {
    //        $('[data-set-device-toggle]').toggleClass('set-device__toggle--active');
    //        if ($(this).hasClass('active')) {
    //            $('.set-device__image-item:visible:first').trigger('click');

    //            $('[data-compare-product-back]').hide();
    //            $('[data-compare-product-close]').show();

    //        }
    //        else {
    //            $('[data-compare-product-back]').show();
    //            $('[data-compare-product-close]').hide();
    //        }

    //    }
    //})

    //$('[data-set-device]').on('dragend', function (event) {
     
    //    var delaytimeout = null;
    //    delaytimeout = setTimeout(function () {

    //        commonvarsetd = false;
    //    }, 1000);
    //});





    $('[data-set-device]').on('click touchstart', function (event) {
       
        event.stopPropagation();
        event.stopImmediatePropagation();
        $('[data-go-apply]').show("slow");

       

      /*  if (commonvarsetd) return;*/
       /* alert('hi');*/
        $('[data-change-textswipeup]').text() === 'Swipe up to set devices' ? $('[data-change-textswipeup]').text('Set up your devices') : $('[data-change-textswipeup]').text('Swipe up to set devices')
        $(this).toggleClass('active');

        if ($('[data-set-swapdevice-toggle]').hasClass('set-swapdevice__toggle--active')) {
            $('[data-set-swapdevice-toggle]').toggleClass('set-swapdevice__toggle--active');
            $('[data-compare-product-back]').show("slow");
            $('[data-compare-product-close]').hide();
        }
        else {
            $('[data-set-device-toggle]').toggleClass('set-device__toggle--active');
            if ($(this).hasClass('active')) {
                $('.set-device__image-item:visible:first').trigger('click');

                $('[data-compare-product-back]').hide();
                $('[data-compare-product-close]').show();

            }
            else {
                $('[data-compare-product-back]').show("slow");
                $('[data-compare-product-close]').hide();
            }

        }
    })


    $('[data-form-submit]').on('click touchstart', function () {
    
        var postcode = $('#input');
      

        if (postcode.val() == '' || postcode.val().length != 9) {
            $('#errormessage1').text('Mobile Number should be 9 Digits');
            return;
        }
        var shortPostCode = postcode.val().substring(0, 3);
            //var validPostCode = /^(EH|KY)/;
        if (shortPostCode == '971') {
            
            $('#errormessage1').text('Mobile Number cannot start with 971');
            return;
        }
           
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/_GetToken",
            data: { MobileNumber: $('#input').val(),ProductName: $('#productName').text()},
            success: function (data, textStatus, XMLHttpRequest) {
                
                $('#ticketnumber1').text(data.sToken);
                $('#queuenumber1').text(data.sQueue);
            },
            error: function (xHr) {
                return false;
            }
        });


        $('[data-form-show-msg]').show();
        $('[data-form-hide-msg]').hide();
        var finalmob = '0' + $('#input').val();
        $('#mobilenumber').text(finalmob);
    })

    $('[data-form-submitcomp]').on('click touchstart', function () {

        var productname2=$(this).attr('dataproductname');

        var postcode = $('#input2');
        if (postcode.val() == '' || postcode.val().length != 9)
        {
            $('#errormessage2').text('Mobile Number should be 9 Digits');
           
            return;
        }
        var shortPostCode = postcode.val().substring(0, 3);
        if (shortPostCode == '971')
        {
           
            $('#errormessage2').text('Mobile Number cannot start with 971');
            return;
        }

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/_GetToken",
            data: { MobileNumber: $('#input2').val(), ProductName: productname2 },
            success: function (data, textStatus, XMLHttpRequest) {
                
                $('#ticketnumber2').text(data.sToken);
                $('#queuenumber2').text(data.sQueue);
            },
            error: function (xHr) {
                return false;
            }
        });


        $('[data-form-show-msg]').show();
        $('[data-form-hide-msg]').hide();
        var finalmob2 = '0' + $('#input2').val();
        $('#mobilenumbercompare').text(finalmob2);
    })

    $(document).on('click touchstart', '[data-form-open]', function () {
        $('#comparesubmitdiv').attr({ 'dataproductname': $(this).attr('data-product-name') }) ;

        $('[data-form-show-msg]').hide();
        $('[data-form-hide-msg]').show();
        $('#input').val('');
        $('#input2').val('');
        $('.buy-now').addClass('buy-now--open');
        var d = new Date();
        var currentDate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
            " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
        $.ajax({
            type: "POST",
            cache: false,
            url: "/Product/UpdateActivity",
            data: {
                createdDateTime: currentDate
            },
            success: function () {

            },
            error: function () {
                return false;
            }
        });
    })

    $('[data-form-close]').on('click touchstart', function () {
        $('.buy-now').removeClass('buy-now--open');
        deleteActivity();

        //setTimeout(function () {
        //    $('.p-item__large-main').addClass('p-item__large-main--hide');
        //    // $('#repair-drop').removeClass('visible').addClass('hidden');
        //}, 600);
        //setTimeout(function () {
        //    $('[pd-main]').addClass('pd-main--close');
        //}, 600);
        //setTimeout(function () {
        //    $('[pl-main]').show();
        //}, 800);
    })

    function deleteActivity() {
        $.ajax({
            type: "DELETE",
            cache: false,
            url: "/Product/DeleteActivity",
            success: function () {

            },
            error: function () {
                return false;
            }
        });
    }

    function init() {
        //deleteActivity();
    }

       $('[data-form-close-second]').on('click touchstart', function () {
        $('.buy-now').removeClass('buy-now--open');
        //deleteActivity();
    })

    window.selectedProduct = 0;
    window.compareList = [];
    $(document).off("click", '.set-device__image .set-device__image-item').on("click", '.set-device__image .set-device__image-item', function () {
        $('.set-device__image-item').removeClass('set-device__image-item--large-image').addClass('set-device__image-item--small-image');
        $(this).removeClass('set-device__image-item--small-image').addClass('set-device__image-item--large-image');
        $('.set-device__image-item').find('img').css({ "height": "200px" });
        $(this).find('img').css({ "height": "300px" });

        selectedProduct = $('.set-device__image .set-device__image-item').index(this);
        //console.log('selectedProduct-imageclick: ' + selectedProduct);
        var product = $(this).data('prod-details');
        $('.p-item__content-name').find('p').text(product.brandName);
        $('.p-item__content-name').find('a').text(product.productName);

        $('#swapOneTimeVatPer, #swapPerMonthVatPer').text(product.vatPercentage + "% VAT inc");
        $('#swapOneTimePrice').text(product.oneTimePrice.toFixed(2));
        $('#swapPerMonthPrice').text(product.priceFrom.toFixed(2));
        $('.swap-storage-option,.swap-payment-option,#swapColor').empty();
      

        var arrStoragegb = [];
        var arrStoragetb = [];
        var arrStorage = [];
        for (var storage in product.storages) {
            if (storage.slice(-2) == 'GB') {
                arrStoragegb.push(Number(storage.substring(0, storage.length - 2)));
            }
            else {
                arrStoragetb.push(Number(storage.substring(0, storage.length - 2)));
            }
        }
        arrStoragegb.sort(function (a, b) {
            return a - b
        });
        arrStoragetb.sort(function (a, b) {
            return a - b
        });

        for (var i = 0; i < arrStoragegb.length; i++) {
            arrStorage.push(arrStoragegb[i] + "GB");
        }
        for (var i = 0; i < arrStoragetb.length; i++) {
            arrStorage.push(arrStoragetb[i] + "TB");
        }


        var index = 0;
        for (var storage of arrStorage) {
           
            storage = storage/* + "GB"*/;
            var div = $('<div>').addClass('radio-button');
            div.loadTemplate($('#swap-storage-template'), {
                storage: storage
            });
            div.find('input').attr({ 'data-price': product.storages[storage], 'data-storage': storage, 'data-index': index++ });
            $('.swap-storage-option').append(div);
        }
        if (product.selectedStorageIndex) {
            $('[data-radio-swap-storage]:nth(' + product.selectedStorageIndex + ')').trigger('click');
        }
        else {
            $('[data-radio-swap-storage]:first').trigger('click');
        }

        index = 0;
        for (var option of product.emiOptions) {
            var div = $('<div>').addClass('radio-button');
            div.loadTemplate($('#swap-payment-option-template'), {
                months: option + "M"
            });
            div.find('input').attr({ 'data-months': option, 'data-index': index++ });
            $('.swap-payment-option').append(div);
        }
        if (product.selectedPaymentIndex) {
            $('[data-radio-swap-payment]:nth(' + product.selectedPaymentIndex + ')').trigger('click');
        }
        else {
            $('[data-radio-swap-payment]:first').trigger('click');
        }

        index = 0
        
        for (var color in product.colors) {
            var li = $('<li>');
            li.loadTemplate($('#swap-device-color-template'), {

            });
            //alert(product.colors[color]);
            li.find('a').css('background', product.colorCode[color]).attr({ 'data-imageUrl': product.colors[color], 'data-color': color, 'data-index': index++ });
            $('#swapColor').append(li);
        }
        if (product.selectedColorIndex) {
            //$('[swap-device-color]:nth(' + product.selectedColorIndex + ')').trigger('click');
            $('#swapColor li:nth-child(' + (product.selectedColorIndex+1) + ')').find('.swap-device-color').trigger('click');
        }
        else
        {
            $('#swapColor li:first').find('.swap-device-color').trigger('click');
        }

    })

    $('[data-color]').on('click touchstart', function () {
        var color = $(this).data();
        $('.pro-image').attr('src', $('.pro-image').data(color.color))
    })

    $('[data-price]').on('click touchstart', function () {
        var price = $(this).data();
        $('.price-f').text($('.price-f').data(price.price))
    })

    $(document).on('click touchstart', '[data-radio]', function () {
        //debugger;
        if ($(this).is(':checked')) {
            var month = $(this).data('months');
            var storage = $('[data-swap-radio]:checked').data('storage');
            if (storage == undefined) {
                storage = '';
            }
            var paymentOptions = JSON.parse(localStorage.getItem('paymentOptions'));

            if (paymentOptions[storage + "-" + month]) {
                $('#priceFrom').text(paymentOptions[storage + "-" + month]);
            }
            if ($('.device-color.active').attr('data-colorname')) {
                var storage = $('[data-swap-radio]:checked').data('storage');
                if (storage == undefined) {
                    storage = '';
                }
                var month = $('[data-radio]:checked').data('months');
                var paymentOptionswithcolor = JSON.parse(localStorage.getItem('paymentOptionswithcolor'));

                if (paymentOptionswithcolor[storage + "-" + month + "-" + $('.device-color.active').attr('data-colorname')] || paymentOptionswithcolor["-" + month + "-" + $('.device-color.active').attr('data-colorname')]) {
                    if (storage = '') {
                        $('#priceFrom').text(paymentOptionswithcolor["-" + month + "-" + $('.device-color.active').attr('data-colorname')]);
                    }
                    else {
                        $('#priceFrom').text(paymentOptionswithcolor[storage + "-" + month + "-" + $('.device-color.active').attr('data-colorname')]);
                    }
                }
            }

        }
        else {

        }
    });

    $(document).on('click touchstart', '[data-swap-radio]', function () {
        //debugger;
        //alert($('.device-color.active').attr('data-colorname'));

        if ($(this).is(':checked')) {

            $('#oneTimePrice').text($(this).data('price'));
            var month = $('[data-radio]:checked').data('months');
            var storage = $(this).data('storage');
            if (storage == undefined) {
                storage = '';
            }
            var paymentOptions = JSON.parse(localStorage.getItem('paymentOptions'));
            if (paymentOptions[storage + "-" + month]) {
                $('#priceFrom').text(paymentOptions[storage + "-" + month]);
            }

         /*   $('#priceFrom').text(paymentOptions[storage + "-" + month]);*/


            if ($('.device-color.active').attr('data-colorname')) {
                var storage = $('[data-swap-radio]:checked').data('storage');
                if (storage == undefined) {
                    storage = '';
                }
                if (Storageswithcolor[storage + "-" + $(this).attr('data-colorname')]) {
                    $('#oneTimePrice').text(Storageswithcolor[storage + "-" + $(this).attr('data-colorname')]);
                }
                var month = $('[data-radio]:checked').data('months');
                var paymentOptionswithcolor = JSON.parse(localStorage.getItem('paymentOptionswithcolor'));

                if (paymentOptionswithcolor[storage + "-" + month + "-" + $('.device-color.active').attr('data-colorname')] || paymentOptionswithcolor["-" + month + "-" + $('.device-color.active').attr('data-colorname')]) {
                    if (storage = '') {
                        $('#priceFrom').text(paymentOptionswithcolor["-" + month + "-" + $('.device-color.active').attr('data-colorname')]);
                    }
                    else {
                        $('#priceFrom').text(paymentOptionswithcolor[storage + "-" + month + "-" + $('.device-color.active').attr('data-colorname')]);
                    }
                }
            }

        }
        else {

        }
    });

    $('[data-compare-color]').on('click touchstart', function () {
        $('[data-color-name]').text($(this).data('compare-color-name'));
        $('.color-bg').css("background", $(this).data('compare-color-code'));
    })



    $('[data-swapdevice-toggle]').on('click touchstart', function (event) {
        event.stopImmediatePropagation();
        $('[data-set-swapdevice-toggle]').toggleClass('set-swapdevice__toggle--active');
        $('[data-set-device-toggle]').toggleClass('set-device__toggle--active');
        $(this).toggleClass('active');
       
    });

    $(document).off('click touchstart', '.deleteDropswap').on('click touchstart', '.deleteDropswap', function (event) {
        var productId = $(this).data('productid');
        $(this).parent().hide("slow");
        var availableswapdevice = $('[data-availableswapdevice]').find('.availableswapdevice-' + productId).remove();
        $('[data-availableswapdevice]').append(availableswapdevice);
        availableswapdevice.show("slow");

        var elementList = ['.compareproductitem-', '.compare-buy-', '.compare-color-', '.compare-feature-', '.configure-product-'];

        for (var element of elementList) {
            $(element + productId).hide("slow");
        }

        $('.compare-product__product-item').css({ "margin-right": "0" });
        if ($('.compare-product__product-item:visible').length == 2) {
            $('.compare-product__product-item:visible:first').css({ "margin-right": "5%" });
            $('.compare-product__product-item:visible:last').css({ "margin-right": "22%" });
        }
    });

    $(document).off('click touchstart', '.set-swapdevice__image-item').on('click touchstart', '.set-swapdevice__image-item', function (event) {
        if ($('.set-swapdevicebottom__image-item:visible').length < 3) {
            var productId = $(this).data('productid');
            $(this).hide("slow");

            var elementList = ['.swapdevicebottom-', '.compareproductitem-', '.compare-buy-', '.compare-color-', '.configure-product-'];

            for (var element of elementList) {
                var parentEl = $(element + productId).parent();
                var childEl = $(element + productId).remove();
                parentEl.append(childEl);
                childEl.show("slow");
            }

            $('.compare-feature-' + productId).each(function (index, el) {
                var parentEl = $(el).parent();
                var childEl = $(el).remove();
                parentEl.append(childEl);
                childEl.show("slow");
            });

            $('.compare-product__product-item').css({ "margin-right": "0" });
            $('.compare-product__product-item').css({ "margin-left": "0" });
            if ($('.compare-product__product-item:visible').length == 2) {
                $('.compare-product__product-item:visible:first').css({ "margin-right": "5%" });
                $('.compare-product__product-item:visible:first').css({ "margin-left": "7%" });
                $('.compare-product__product-item:visible:last').css({ "margin-right": "16%" });
            }
            if ($('.compare-product__product-item:visible').length == 3) {
                $('.compare-product__product-item:visible:first').css({ "margin-left": "7%" });
            }
        }
    });

    $('[data-go-compare]').off('click touchend').on('click touchend', function () {
     
        var productId1 = localStorage.getItem("ProductId1");
        var productId2 = localStorage.getItem("ProductId2");
        var productId3 = localStorage.getItem("ProductId3");
        if (!productId1) {
            productId1 = $(".drop-product .p-item:nth(0)").data('item-id');
            productId2 = $(".drop-product .p-item:nth(1)").data('item-id');
            productId3 = $(".drop-product .p-item:nth(2)").data('item-id');
        }
        else {
            localStorage.removeItem("ProductId1");
            localStorage.removeItem("ProductId2");
            localStorage.removeItem("ProductId3");
        }
        if (!productId1 || !productId2)
            //alert('cant');
            return false;

        window.compareList = [];
        window.compareList.push(productId1);
        window.compareList.push(productId2);
        if (productId3)
            window.compareList.push(productId3);
        //$('[pl-main]').hide();
       
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/_GetCompareDevices",
            data: { prodId1: productId1, prodId2: productId2, prodId3: productId3 },
            success: function (data, textStatus, XMLHttpRequest) {
                $('[pc-min]').html(data).show();

                //$('[pc-min]').show();
                $('[pl-main]').hide();
                $('.compare-wrap').addClass('fade-up');

            },
            error: function (xHr) {
                return false;
            }
        });
    })


    $('[data-send-compare]').off('click touchstart').on('click touchstart', function () {
        $('.compare-wrap').addClass('fade-up');
        $('[pd-main]').hide();
        $('[pl-main]').show();
        $('body').removeClass('overlay-layer');
        $('[data-swipe-click]').trigger('click');
      

        var draggedItem = $('.p-item[data-item-id="' + current_item_id + '"]');
        var drag = draggedItem.clone().draggable({
            revert: "invalid",
            stack: ".p-item",
            refreshPositions: true,
            helper: 'clone',
            disabled: false
        });
        drag.appendTo($('.dropbox:first'));
        var cutomId = makeid(5);
        $('.dropbox:first').addClass("drop-product__item--product-droped").append("<div class='deleteDrop' id='" + cutomId + "'></div>");
        draggedItem.draggable({ disabled: true }).addClass('').attr('id', cutomId);
    });

    $('[data-compare-product-back]').on('click touchend', function () {
        $('[pc-min]').hide();
        $('[pl-main]').show();
        $("[data-compare-close]").trigger('click');
    });

    $('[data-compare-product-close]').on('click touchend', function (event) {
        event.stopImmediatePropagation();
        $("[data-set-device]").trigger('click');
        //$('[data-compare-product-back]').show();
        //$('[data-compare-product-close]').hide();
    });

    $('[data-new-compare]').on('click touchstart', function () {
        $('.compare-wrap').toggleClass('add-animation fade-up');
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/_GetCompareDevices",
            data: {
                prodId1: $(this).find(".tranding-product__images-item:nth(0)").data('prod-id'),
                prodId2: $(this).find(".tranding-product__images-item:nth(1)").data('prod-id'),
                prodId3: $(this).find(".tranding-product__images-item:nth(2)").data('prod-id')
            },
            success: function (data, textStatus, XMLHttpRequest) {
                $('[pc-min]').html(data).show();
            },
            error: function (xHr) {
                return false;
            }
        });
    })

    $(document).on('click touchstart', '.device-color', function () {
        $('.device-color').removeClass("active");
        $(this).addClass("active");
        $('#productImageUrl').attr('src', $(this).attr('data-imageUrl'));
        $('#selectcolor').html($(this).attr('data-colorname'));
        //debugger;

       
        var Storageswithcolor = JSON.parse(localStorage.getItem('Storageswithcolor'));
       
        var storage = $('[data-swap-radio]:checked').data('storage');
        if (storage == undefined) {
            storage = '';
        }
        $('#oneTimePrice').text(Storageswithcolor[storage + "-" + $(this).attr('data-colorname')]);
        var month = $('[data-radio]:checked').data('months');
        var paymentOptionswithcolor = JSON.parse(localStorage.getItem('paymentOptionswithcolor'));
        //$('#priceFrom').text(paymentOptionswithcolor[storage + "-" + month + "-" + $(this).attr('data-colorname')]);
        if (paymentOptionswithcolor[storage + "-" + month + "-" + $('.device-color.active').attr('data-colorname')] || paymentOptionswithcolor["-" + month + "-" + $('.device-color.active').attr('data-colorname')]) {
            if (storage = '') {
                $('#priceFrom').text(paymentOptionswithcolor["-" + month + "-" + $('.device-color.active').attr('data-colorname')]);
            }
            else {
                $('#priceFrom').text(paymentOptionswithcolor[storage + "-" + month + "-" + $('.device-color.active').attr('data-colorname')]);
            }
        }
    })

    $(document).off('click touchstart', '.swap-device-color').on('click touchstart', '.swap-device-color', function () {
        //debugger;
        $('.swap-device-color').removeClass("active");
        $(this).addClass("active");
        $('.set-device__image').find('img:nth(' + selectedProduct + ')').attr('src', $(this).attr('data-imageUrl'));
        //var parent = $('.compare-product__product-item:nth(' + selectedProduct + ')');
        //parent.find('.c-product__top-image img').attr('src', $(this).attr('data-imageUrl'));
        //parent.find('[data-color-name]').text($(this).data('color'));
        //parent.find('.lbl-product-color').css('background', $(this).data('color'));
        var product = $('.set-device__image-item:nth(' + selectedProduct + ')').data('prod-details');
        product.selectedColorIndex = $(this).data('index');
        product.selectedColorValue = $(this).attr('data-color');
        product.selectedColorCode = $(this).css("background-color");
        $('.set-device__image .set-device__image-item:nth(' + selectedProduct + ')').data('prod-details', product);
        $('#selectcolorcompare').html($(this).attr('data-color'));
        //debugger;
        var storage = $('[data-radio-swap-storage]:checked').data('storage');
        if (storage == undefined) {
            storage = '';
        }
        //var product = $('.set-device__image-item:nth(' + selectedProduct + ')').data('prod-details');
       
        if (product.Storageswithcolor[storage + "-" + $(this).attr('data-color')]) {
            $('#swapOneTimePrice').text(product.Storageswithcolor[storage + "-" + $(this).attr('data-color')]);
        }
        //debugger;
        var month = $('[data-radio-swap-payment]:checked').data('months');
        if (product.PaymentOptionswithcolor[storage + "-" + month + "-" + $(this).attr('data-color')]) {
            $('#swapPerMonthPrice').text(product.PaymentOptionswithcolor[storage + "-" + month + "-" + $(this).attr('data-color')]);
        }
    })

    $(document).on('click touchstart', '[data-radio-swap-payment]', function () {
        if ($(this).is(':checked')) {
            var month = $(this).data('months');
            var storage = $('[data-radio-swap-storage]:checked').data('storage');
            if (storage == undefined) {
                storage = '';
            }
            var product = $('.set-device__image-item:nth(' + selectedProduct + ')').data('prod-details');
            $('#swapPerMonthPrice').text(product.paymentOptions[storage + "-" + month]);
            //var parent = $('.compare-product__product-item:nth(' + selectedProduct + ')');
            //parent.find('.compare-product-pricefrom').text(product.paymentOptions[storage + "-" + month]);
            product.selectedPaymentIndex = $(this).data('index');
            $('.set-device__image .set-device__image-item:nth(' + selectedProduct + ')').data('prod-details', product);

            if ($('.swap-device-color.active').attr('data-color')) {
                //debugger;
                if (product.PaymentOptionswithcolor[storage + "-" + month + "-" + $('.swap-device-color.active').attr('data-color')]) {
                    $('#swapPerMonthPrice').text(product.PaymentOptionswithcolor[storage + "-" + month + "-" + $('.swap-device-color.active').attr('data-color')]);
                }

                if (product.PaymentOptionswithcolor[storage + "-" + month + "-" + $('.swap-device-color.active').attr('data-color')] || product.paymentOptionswithcolor["-" + month + "-" + $('.swap-device-color.active').attr('data-color')]) {
                    if (storage = '') {
                        $('#priceFrom').text(product.paymentOptionswithcolor["-" + month + "-" + $('.swap-device-color.active').attr('data-color')]);
                    }
                    else {
                        $('#priceFrom').text(product.PaymentOptionswithcolor[storage + "-" + month + "-" + $('.swap-device-color.active').attr('data-color')]);
                    }
                }
            }
        }

    });

    $(document).on('click touchstart', '[data-radio-swap-storage]', function () {
        if ($(this).is(':checked')) {
            //debugger;
            
            var storage = $(this).data('storage');
             if (storage == undefined) {
                storage = '';
            }
            if (storage != '') {
                $('#swapOneTimePrice').text($(this).data('price'));
                var month = $('[data-radio-swap-payment]:checked').data('months');

                var product = $('.set-device__image-item:nth(' + selectedProduct + ')').data('prod-details');
                $('#swapPerMonthPrice').text(product.paymentOptions[storage + "-" + month]);
                //var parent = $('.compare-product__product-item:nth(' + selectedProduct + ')');
                //parent.find('.compare-product-onetimeprice').text($(this).data('price').toFixed(2));
                //parent.find('.compare-product-pricefrom').text(product.paymentOptions[storage + "-" + month]);
                //parent.find('[data-capacity]').text(storage);
                product.selectedStorageIndex = $(this).data('index');
                $('.set-device__image .set-device__image-item:nth(' + selectedProduct + ')').data('prod-details', product);

                if ($('.swap-device-color.active').attr('data-color')) {
                    if (product.Storageswithcolor[storage + "-" + $('.swap-device-color.active').attr('data-color')]) {
                        $('#swapOneTimePrice').text(product.Storageswithcolor[storage + "-" + $('.swap-device-color.active').attr('data-color')]);
                    }
                    //debugger;
                    if (product.PaymentOptionswithcolor[storage + "-" + month + "-" + $('.swap-device-color.active').attr('data-color')]) {
                        $('#swapPerMonthPrice').text(product.PaymentOptionswithcolor[storage + "-" + month + "-" + $('.swap-device-color.active').attr('data-color')]);
                    }
                }
            }

        }
    });
   
    
    $('[data-go-apply]').on('click touchend', function (event)
    {
        /* alert('hi');*/
        event.stopImmediatePropagation();
        $('[data-go-apply]').hide();
        $("[data-set-device]").trigger('click');
       /* $(this).unbind();*/
         /* alert('hi');*/
        //even.stopPropagation();
        //event.stopImmediatePropagation();
        //event.preventDefault();

        $(".set-device__image-item:visible").each(function (index, element) {
            //debugger;
            var product = $('.set-device__image-item:visible:nth(' + index + ')').data('prod-details');

            var arrStoragegb = [];
            var arrStoragetb = [];
            var arrStorage = [];
            for (var storage in product.storages) {
                if (storage.slice(-2) == 'GB') {
                    arrStoragegb.push(Number(storage.substring(0, storage.length - 2)));
                }
                else {
                    arrStoragetb.push(Number(storage.substring(0, storage.length - 2)));
                }
            }
            arrStoragegb.sort(function (a, b) {
                return a - b
            });
            arrStoragetb.sort(function (a, b) {
                return a - b
            });

            for (var i = 0; i < arrStoragegb.length; i++) {
                arrStorage.push(arrStoragegb[i] + "GB");
            }
            for (var i = 0; i < arrStoragetb.length; i++) {
                arrStorage.push(arrStoragetb[i] + "TB");
            }
          
          

            var parent = $('.compare-product__product-item:visible:nth(' + index + ')');


            if (product.selectedPaymentIndex != null && product.selectedStorageIndex != null) {
                var month = product.emiOptions[product.selectedPaymentIndex];
                var storage = arrStorage[product.selectedStorageIndex]/* + "GB"*/;
                parent.find('.compare-product-onetimeprice').text(Number(product.storages[storage]));
                

                if (product.PaymentOptionswithcolor[storage + "-" + month + product.selectedColorValue] != undefined) {
                    parent.find('.compare-product-pricefrom').text(product.PaymentOptionswithcolor[storage + "-" + month + product.selectedColorValue]);
                }
                else {
                    parent.find('.compare-product-pricefrom').text(product.paymentOptions[storage + "-" + month]);
                }
                parent.find('[data-capacity]').text(storage);
                parent.find('.c-product__top-image img').attr('src', product.colors[product.selectedColorValue]);
                parent.find('[data-color-name]').text(product.selectedColorValue.toLowerCase());
                parent.find('.lbl-product-color').css('background', product.selectedColorCode);
            }
            else if (arrStorage.length == 0) {
                var month = product.emiOptions[product.selectedPaymentIndex];
                //var storage = arrStorage[product.selectedStorageIndex] + "GB";
                parent.find('.compare-product-onetimeprice').text(Number(product.oneTimePrice));
                if (product.selectedColorValue != undefined) {
                    parent.find('.compare-product-pricefrom').text(product.PaymentOptionswithcolor["-" + month + "-" + product.selectedColorValue]);
                }
                parent.find('[data-capacity]').text(storage);
                if (product.selectedColorValue != undefined) {
                    parent.find('.c-product__top-image img').attr('src', product.colors[product.selectedColorValue]);
                    parent.find('[data-color-name]').text(product.selectedColorValue.toLowerCase());
                    parent.find('.lbl-product-color').css('background', product.selectedColorCode);
                }
            }
          
        });
      

        //$('[data-change-textswipeup]').text() === 'Swipe up to set devices' ? $('[data-change-textswipeup]').text('Set up your devices') : $('[data-change-textswipeup]').text('Swipe up to set devices')
        //$("[data-set-device]").toggleClass('active');

        //if ($('[data-set-swapdevice-toggle]').hasClass('set-swapdevice__toggle--active')) {
        //    $('[data-set-swapdevice-toggle]').toggleClass('set-swapdevice__toggle--active');
        //    $('[data-compare-product-back]').show();
        //    $('[data-compare-product-close]').hide();
        //}
        //else {
        //    $('[data-set-device-toggle]').toggleClass('set-device__toggle--active');
        //    if ($("[data-set-device]").hasClass('active')) {
        //        $('.set-device__image-item:visible:first').trigger('click');

        //        $('[data-compare-product-back]').hide();
        //        $('[data-compare-product-close]').show();

        //    }
        //    else {
        //        $('[data-compare-product-back]').show();
        //        $('[data-compare-product-close]').hide();
        //    }

        //}
       
       
      /*  $(this).unbind();*/
    });

    var current_item_id = '';

    $('[data-sp-back]').on('click touchstart', function () {
        $('[pl-main]').show();
        $('.pd-main').addClass('pd-main--close');
        $("[data-compare-close]").trigger('click');
    });

    $('.p-item').bind('click touchend', function () {
       
        $('#selectcolor').html('');
        if ($(this).data('dragging')) return;

        $('.content-body__product').removeClass('content-body__product--drag');
        $('.content-body__bottom--compare-bottom').removeClass('active');
        $('.content-body').removeClass('active');
        $('.on-compare-button').removeClass('active');
        //alert('hi');
        compareimagechange();

        var productId = localStorage.getItem("ProductId1");
        localStorage.removeItem("ProductId1");
        current_item_id = productId ? productId : $(this).attr('data-item-id');
        $('[pl-main]').hide();
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/GetProdcutConfigurations",
            data: { Id: current_item_id },
            dataType: "json",
            success: function (data, textStatus, XMLHttpRequest) {
              
                localStorage.setItem("paymentOptions", JSON.stringify(data.paymentOptions));
                //debugger;
                localStorage.setItem("Storageswithcolor", JSON.stringify(data.storageswithcolor));
                localStorage.setItem("paymentOptionswithcolor", JSON.stringify(data.paymentOptionswithcolor));
                $("#productImageUrl").attr("src", data.productImageUrl);
                $("#brandName").text(data.brandName);
                $("#productName").text(data.productName);

               
                $("#vatPercent,#oneTimeVatPercent").html(data.vatpercentage + "% VAT inc");
                $("#priceFrom").html(data.priceFrom);
                $("#oneTimePrice").html(data.oneTimePrice.toFixed(2));
                $('.storage-option,.payment-option,#colors').empty();
                $('#storagefeature').hide();
                
                var arrStoragegb = [];
                var arrStoragetb = [];
                var arrStorage = [];
                for (var storage in data.storages) {
                    if (storage.slice(-2) == 'GB') {
                        arrStoragegb.push(Number(storage.substring(0, storage.length - 2)));
                    }
                    else {
                        arrStoragetb.push(Number(storage.substring(0, storage.length - 2)));
                    }
                }
                arrStoragegb.sort(function (a, b) {
                    return a - b
                });
                arrStoragetb.sort(function (a, b) {
                    return a - b
                });

                for (var i = 0; i < arrStoragegb.length; i++) {
                    arrStorage.push(arrStoragegb[i] + "GB");
                }
                for (var i = 0; i < arrStoragetb.length; i++) {
                    arrStorage.push(arrStoragetb[i] + "TB");
                }

                for (var storage of arrStorage) {
                    $('#storagefeature').show();
                    storage = storage/* + "GB"*/;
                    var div = $('<div>').addClass('radio-button');
                    div.loadTemplate($('#storage-template'), {
                        storage: storage
                    });
                    div.find('input').attr({ 'data-price': data.storages[storage], 'data-storage': storage });
                    $('.storage-option').append(div);
                }
                $('[data-swap-radio]:first').trigger('click');
                for (var option of data.emiOptions) {
                    var div = $('<div>').addClass('radio-button');
                    div.loadTemplate($('#payment-option-template'), {
                        months: option + "M"
                    });
                    div.find('input').attr({ 'data-months': option });
                    $('.payment-option').append(div);
                }
                $('[data-radio]:first').trigger('click');
                for (var color in data.colors) {
                    var li = $('<li>');
                    li.loadTemplate($('#device-color-template'), {

                    });
                    li.find('a').css('background', data.colorCode[color]);
                    li.find('a').attr('data-imageUrl', data.colors[color]);
                    li.find('a').attr('data-colorname', color);
                    $('#colors').append(li);
                }
                $('#colors li:first').find('.device-color').trigger('click');
            },
            error: function (xHr) {
                return false;
            }
        });
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/_GetFeatureGroup",
            data: { Id: current_item_id },
            success: function (data, textStatus, XMLHttpRequest) {
               // alert(current_item_id);
                $('#featureGroup').html(data);
            },
            error: function (xHr) {
                return false;
            }
        });


        $('[pd-main]').show();
        $('.p-item__large-main').removeClass('p-item__large-main--hide');
        $('.pd-main').removeClass('pd-main--close');
    });

    $('.p-item').on('swipeleft', swipeleftHandler);

    function swipeleftHandler(event) {
        //debugger;
        $('#selectcolor').html('');
        if ($(this).data('dragging')) return;
        var productId = localStorage.getItem("ProductId1");
        localStorage.removeItem("ProductId1");
        current_item_id = productId ? productId : $(this).attr('data-item-id');
        $('[pl-main]').hide();
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/GetProdcutConfigurations",
            data: { Id: current_item_id },
            dataType: "json",
            success: function (data, textStatus, XMLHttpRequest) {
                $('.content-body__product').removeClass('content-body__product--drag');
                $('.content-body__bottom--compare-bottom').removeClass('active');
                $('.content-body').removeClass('active');
                $('.on-compare-button').removeClass('active');
                //alert('hi');
                compareimagechange();

                localStorage.setItem("paymentOptions", JSON.stringify(data.paymentOptions));
                $("#productImageUrl").attr("src", data.productImageUrl);
                $("#brandName").text(data.brandName);
                $("#productName").text(data.productName);



                $("#vatPercent,#oneTimeVatPercent").html(data.vatpercentage + "% VAT inc");
                $("#priceFrom").html(data.priceFrom);
                $("#oneTimePrice").html(data.oneTimePrice.toFixed(2));
                $('.storage-option,.payment-option,#colors').empty();
                var arrStoragegb = [];
                var arrStoragetb = [];
                var arrStorage = [];
                for (var storage in data.storages) {
                    if (storage.substring(-2) == 'GB') {
                        arrStoragegb.push(Number(storage.substring(0, storage.length - 2)));
                    }
                    else {
                        arrStoragetb.push(Number(storage.substring(0, storage.length - 2)));
                    }
                }
                arrStoragegb.sort(function (a, b) {
                    return a - b
                });
                arrStoragetb.sort(function (a, b) {
                    return a - b
                });

                for (var i = 0; i < arrStoragegb.length; i++) {
                    arrStorage.push(arrStoragegb[i]+"GB");
                }
                for (var i = 0; i < arrStoragetb.length; i++) {
                    arrStorage.push(arrStoragetb[i] + "TB");
                }

                for (var storage of arrStorage) {
                    storage = storage /*+ "GB"*/;
                    var div = $('<div>').addClass('radio-button');
                    div.loadTemplate($('#storage-template'), {
                        storage: storage
                    });
                    div.find('input').attr({ 'data-price': data.storages[storage], 'data-storage': storage });
                    $('.storage-option').append(div);
                }
                //$('[data-swap-radio]:first').trigger('click');
               
                for (var option of data.emiOptions) {
                    var div = $('<div>').addClass('radio-button');
                    div.loadTemplate($('#payment-option-template'), {
                        months: option + "M"
                    });
                    div.find('input').attr({ 'data-months': option });
                    $('.payment-option').append(div);
                }
                $('[data-radio]:first').trigger('click');
                for (var color in data.colors) {
                    var li = $('<li>');
                    li.loadTemplate($('#device-color-template'), {

                    });
                    li.find('a').css('background', data.colorCode[color]);
                    li.find('a').attr('data-imageUrl', data.colors[color]);
                    li.find('a').attr('data-colorname', color);
                    $('#colors').append(li);
                }
                $('#colors li:first').find('.device-color').trigger('click');
            },
            error: function (xHr) {
                return false;
            }
        });
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/_GetFeatureGroup",
            data: { Id: current_item_id },
            success: function (data, textStatus, XMLHttpRequest) {
                // alert(current_item_id);
                $('#featureGroup').html(data);
            },
            error: function (xHr) {
                return false;
            }
        });


        $('[pd-main]').show();
        $('.p-item__large-main').removeClass('p-item__large-main--hide');
        $('.pd-main').removeClass('pd-main--close');
    }


    $.fn.liveDroppable = function (opts) {
        if (!$(this).data("ctDropInit")) {
            $(this).data("ctDropInit", true).droppable(opts);
        }
    };

    var productId1 = localStorage.getItem("ProductId1");
    var productId2 = localStorage.getItem("ProductId2");
    if (productId2) {
        $('[data-go-compare]').trigger('click');
    }
    else if (productId1) {
        $('.p-item[data-item-id=' + productId1 + ']').trigger('click');
    }

    $('.p-item').draggable({
        cursor: "move",
        distance: 20,
        revert: "invalid",
        stack: ".p-item",
        helper: 'clone',
        tolerance: "touch",
        refreshPositions: true,
        cursorAt: { top: 150, left: 120 },
        hoverClass: "ctDropHover",
        start: function (event, ui) {
            $(this).data('dragging', true);
            $(this).draggable("option", "cursorAt", {
                left: Math.floor(ui.helper.width() / 2),
                top: Math.floor(ui.helper.height() / 2)
            });
        },
        stop: function (event, ui) {
            setTimeout(function () {
                $(event.target).data('dragging', false);
            }, 1);
        }


   });


    $('.p-item').draggable({
        listeners: {
            move(event) {
                console.log(event.pageX,
                    event.pageY)
            }
        }
    })

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    $('.dropbox').droppable({
        accept: ".p-item",
        hoverClass: "drop-hover",
        tolerance: "touch",

        drop: function (event, ui) {
            $(".dropbox").droppable({ disabled: true });
            // console.log('dropp');
            if ($(this).children().hasClass('ui-draggable')) {
                return false;
            } else {
                $(this).addClass("drop-product__item--product-droped");
            }
            var droppable = $(this);
            var draggable = ui.draggable;
            var drag = $('.dropbox').has(ui.draggable).length ? draggable : draggable.clone().draggable({
                revert: "invalid",
                stack: ".p-item",
                refreshPositions: true,
                helper: 'clone'
            });
            $('.dragdropbox').addClass('dragdropbox-dropped');
            drag.appendTo(droppable);
            var cutomId = makeid(5);
            $(this).append("<div class='deleteDrop' id='" + cutomId + "'></div>");
            ui.draggable.draggable({ disabled: true }).addClass('').attr('id', cutomId);
            compareimagechange();   
            //for (i = 0; i < 4; i++) {
            //    var textcount = $(".p-item.ui-draggable-dragging").find("." + i + "-head").text().length;
            //    var fontsizenew = 35 - textcount;
            //    if (textcount > 20) {
            //        $(".p-item.ui-draggable-dragging").find("." + i + "-head").css({ "font-size": "" + fontsizenew + "px" });
            //    }
            //    else {
            //        $(".p-item.ui-draggable-dragging").find("." + i + "-head").css({ "font-size": "16px" });
            //    }
            //}
        }
    });


    $('.dragdropbox').droppable({
        
        accept: ".p-item",
        hoverClass: "drop-hover",
        // activeClass:  "drop-hover",
        tolerance: "touch",
        drop: function (event, ui) {
            //debugger;
            if ($('.dragdropbox').hasClass('dragdropbox-dropped')) {
                $('.dragdropbox').removeClass('dragdropbox-dropped');
                return false;
            }
            $(".dropbox").droppable({ disabled: true });

            var a = document.getElementById('dropbox_1');  //mkv
            if ($(a).hasClass('drop-product__item--product-droped')) {
                a = document.getElementById('dropbox_2');
                if ($(a).hasClass('drop-product__item--product-droped')) {
                    a = document.getElementById('dropbox_3');
                } else {
                    a = document.getElementById('dropbox_2');
                }
            }
            else {
                a = document.getElementById('dropbox_1');
            }


            if ($(a).children().hasClass('ui-draggable')) {
                return false;
            } else {
                $(a).addClass("drop-product__item--product-droped");
            }
            var droppable = $(a);
            var draggable = ui.draggable;
            var drag = $('.dropbox').has(ui.draggable).length ? draggable : draggable.clone().draggable({
                revert: "invalid",
                stack: ".p-item",
                refreshPositions: true,
                helper: 'clone'
            });

            drag.appendTo(droppable);
            var cutomId = makeid(5);
            $(a).append("<div class='deleteDrop' id='" + cutomId + "'></div>");
            ui.draggable.draggable({ disabled: true }).addClass('').attr('id', cutomId);;
            compareimagechange();  
        }
    });


    //Single Page Buy Now
    $('[data-number]').click(function () {
        $('#errormessage1').text('');
        $('#errormessage2').text('');
        var v = $(this).val();
        if ($("#input2").val().length < 9) {
            $('[data-input]').val($("#input2").val() + v);
        }
    });

    //Compare Page
    $('[data-number1]').unbind('click').bind('click', function (e) {
        $('#errormessage2').text('');
        $('#errormessage1').text('');
        var v = $(this).val();

        if ($("#input").val().length < 9) {
            $('[data-input]').val($("#input").val() + v);
        }

    });


    $('[data-erase]').on('click touchstart', function () {
        var str = $('[data-input]').val();
        $('[data-input]').val(str.substring(0, str.length - 1));
    });


    // Sroll Single Page
    $(function () {
        new jScroll('.scrollbar');
        $('.scrollbar').jScroll({
            type: 'h',
        });
    });

    // Sroll Compare page

    $(function () {
        new jScroll('.scrollbar2');
        $('.scrollbar2').jScroll({
            type: 'h',
        });
    });

})



function compareimagechange() {
   
    var productId1 = localStorage.getItem("ProductId1");
    var productId2 = localStorage.getItem("ProductId2");
    var productId3 = localStorage.getItem("ProductId3");
    if (!productId1) {
        productId1 = $(".drop-product .p-item:nth(0)").data('item-id');
        productId2 = $(".drop-product .p-item:nth(1)").data('item-id');
        productId3 = $(".drop-product .p-item:nth(2)").data('item-id');
    }
    else {
        localStorage.removeItem("ProductId1");
        localStorage.removeItem("ProductId2");
        localStorage.removeItem("ProductId3");
    }

   // alert(productId1 + ' gap ' + productId2);

    if (!productId1 || !productId2) {
        image = 'images/compare.png';
    }
    else {
        image = 'images/compareactive.png';
    }
    $('[data-compare-image]').attr('src', image);

   
}

$('.p-item').on('touchmove dragstart', function (event) {
    $('[data-change-comparetext]').text('Compare Devices');
    //=== 'Swipe up to compare devices' ? $('[data-change-comparetext]').text('Compare Devices') : $('[data-change-comparetext]').text('Swipe up to compare devices');
    $('[data-change-maintitle]').text('Drag any phone to compare');
    //=== 'Swipe or tap to explore our devices.' ? $('[data-change-maintitle]').text('Drag any phone to Compare') : $('[data-change-maintitle]').text('Swipe or tap to explore our devices.');
    $(".dropbox").droppable({ disabled: false });
    $('.content-body__product').addClass('content-body__product--drag');
    $('.content-body__bottom--compare-bottom').addClass('active');
    $('.content-body').addClass('active');
    $('.on-compare-button').addClass('active');
    $('.swipe-upto-compare').addClass('active');
   
    compareimagechange();
});


$('[data-compare-close]').on('click touchend', function () {
  
    $('[data-change-comparetext]').text('Swipe up to compare devices');
    //=== 'Swipe up to compare devices' ? $('[data-change-comparetext]').text('Compare Devices') : $('[data-change-comparetext]').text('Swipe up to compare devices');
    $('[data-change-maintitle]').text('Swipe or tap to explore our devices.');
    $('.content-body__product').removeClass('content-body__product--drag');
    $('.content-body__bottom--compare-bottom').removeClass('active');
    $('.content-body').removeClass('active');
    $('.on-compare-button').removeClass('active');
    $('.swipe-upto-compare').removeClass('active');
    compareimagechange();
    $(".deleteDrop").trigger('click');
    $('.p-item').removeClass('ui-draggable-disabled');
})
$("html").on("drop", function (event) {
    //compareimagechange();
    // $(this).addClass("test");
});
$(document).on('click touchstart', 'div.ui-droppable>div.deleteDrop', function () {
  
    $(this).closest('.ui-droppable').removeClass('drop-product__item--product-droped');
    var _this = $(this);
    var deleteid = $(this).attr('id');
    $('html').find("#" + deleteid).draggable().draggable('disable');
    $('html').find("#" + deleteid).draggable("enable");
    $(this).prev('.ui-draggable').remove();
    $(this).remove();
    compareimagechange();
});




$(function () {
   
    var commonvar = false;
    $('[data-swipe-click]').on('dragstart', function (event) {


        commonvar = true;
        event.stopPropagation();
        event.stopImmediatePropagation();
        $('[data-change-comparetext]').text() === 'Swipe up to compare devices' ? $('[data-change-comparetext]').text('Compare Devices') : $('[data-change-comparetext]').text('Swipe up to compare devices')
        $('[data-change-maintitle]').text() === 'Swipe or tap to explore our devices.' ? $('[data-change-maintitle]').text('Drag any phone to compare') : $('[data-change-maintitle]').text('Swipe or tap to explore our devices.');
        $('.content-body__product').toggleClass('content-body__product--drag');
        $('.content-body__bottom--compare-bottom').toggleClass('active');
        $('.content-body').toggleClass('active');
        $('.on-compare-button').toggleClass('active');
        $('.swipe-upto-compare').toggleClass('active');
        compareimagechange();
        $(".deleteDrop").trigger('click');
       
    });

    $('[data-swipe-click]').on('dragend', function (event) {
        
        var delaytimeout = null;
        delaytimeout = setTimeout(function () {
          
            commonvar = false;
        }, 1000);
    });

    $('[data-swipe-click]').on('click touchstart', function (event) {

        event.stopPropagation();
        event.stopImmediatePropagation();

        if (commonvar) return;
        $('[data-change-comparetext]').text() === 'Swipe up to compare devices' ? $('[data-change-comparetext]').text('Compare Devices') : $('[data-change-comparetext]').text('Swipe up to compare devices')
        $('[data-change-maintitle]').text() === 'Swipe or tap to explore our devices.' ? $('[data-change-maintitle]').text('Drag any phone to compare') : $('[data-change-maintitle]').text('Swipe or tap to explore our devices.');
        $('.content-body__product').toggleClass('content-body__product--drag');
        $('.content-body__bottom--compare-bottom').toggleClass('active active-compare-wrapper');
        $('.content-body').toggleClass('active');
        $('.on-compare-button').toggleClass('active');
        $('.swipe-upto-compare').toggleClass('active');
        compareimagechange();
        $(".deleteDrop").trigger('click');

    });

});
