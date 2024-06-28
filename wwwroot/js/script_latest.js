$(document).ready(function () {

    var timerSet = false;
    var idleTimerRecurring = null;

    function init() {
        deleteActivity();
    }

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

    init();

    $(document).bind('click mouseover keypress tap swipe scrollstart orientationchange', function (e) {
        if (timerSet) {
            clearTimeout(idleTimerRecurring);
            timerSet = false;
        }

        if (!timerSet) {
            idleTimerRecurring = setTimeout(function () { window.location.reload(); }, parseInt(defaultIdleLimit) * 1000);
            timerSet = true;
        }
    });

    $('.content-body__product-item').each(function (index) {
        //debugger;
        //var height = $('.content-body__product-item:nth(' + index + ')').css('height');
        //$('.content-body__product-item:nth(' + index + ')').find('.p-item').css('height', height);
    });

    $('[data-product-main]').click(function () {
        $(this).parents('.content-body__product-item').addClass('content-body__product-item--active');
        $('[data-swipe]').hide();
        $('[data-product]').show();
    })
    $('[data-configration]').click(function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var src = $('[data-change-image]').attr('src');
        var image = (src == 'images/setting.png') ? 'images/setting-white.png' : 'images/setting.png';
        $('[data-change-image]').attr('src', image);

        $('[data-change-text]').text() === 'Swipe up to configure' ? $('[data-change-text]').text('Hide configuration') : $('[data-change-text]').text('Swipe up to configure')

        $(this).toggleClass('active');
        $('.p-item__large').toggleClass('active');
    })

    $('[data-set-device]').click(function () {
        if ($('[data-set-swapdevice-toggle]').hasClass('set-swapdevice__toggle--active')) {
            $('[data-set-swapdevice-toggle]').toggleClass('set-swapdevice__toggle--active');
        }
        else {
            $('[data-set-device-toggle]').toggleClass('set-device__toggle--active');
        }
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.set-device__image-item:first').trigger('click');
        }
    })


    $('[data-swapdevice-toggle]').click(function () {

        $('[data-set-swapdevice-toggle]').toggleClass('set-swapdevice__toggle--active');
        $('[data-set-device-toggle]').toggleClass('set-device__toggle--active');
        $(this).toggleClass('active');
    })

    $('[data-set-swapdevice]').click(function () {
        $('[data-set-swapdevice-toggle]').toggleClass('set-swapdevice__toggle--active');

        $(this).toggleClass('active');
    })

    $('[data-form-submit]').click(function () {
        $('[data-form-show-msg]').show();
        $('[data-form-hide-msg]').hide();
    })

    $('[data-form-open]').click(function () {
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

    $('[data-form-close]').click(function () {
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

    $('[data-go-compare]').click(function () {
        $('.compare-wrap').addClass('fade-up');
    })



    $('[data-form-close-second]').click(function () {
        $('.buy-now').removeClass('buy-now--open');
        deleteActivity();
    })

    window.selectedProduct = 0;
    $('.set-device__image .set-device__image-item').off("click").on("click", function () {
        $('.set-device__image-item').removeClass('set-device__image-item--large-image').addClass('set-device__image-item--small-image');
        $(this).removeClass('set-device__image-item--small-image').addClass('set-device__image-item--large-image');
        selectedProduct = $('.set-device__image .set-device__image-item').index(this);
        console.log('selectedProduct-imageclick: ' + selectedProduct);
        var product = $(this).data('prod-details');
        $('.p-item__content-name').find('p').text(product.brandName);
        $('.p-item__content-name').find('a').text(product.productName);
        $('#swapOneTimeVatPer, #swapPerMonthVatPer').text(product.vatPercentage + "% VAT inc");
        $('#swapOneTimePrice').text(product.oneTimePrice.toFixed(2));
        $('#swapPerMonthPrice').text(product.priceFrom.toFixed(2));
        $('.swap-storage-option,.swap-payment-option,#swapColor').empty();
        var arrStorage = [];
        for (var storage in product.storages) {
            arrStorage.push(Number(storage.substring(0, storage.length - 2)));
        }
        arrStorage.sort(function (a, b) {
            return a - b
        });
        var index = 0;
        for (var storage of arrStorage) {
            storage = storage + "GB";
            var div = $('<div>').addClass('radio-button');
            div.loadTemplate($('#swap-storage-template'), {
                storage: storage
            });
            div.find('input').attr({ 'data-price': product.storages[storage], 'data-storage': storage, 'data-index' : index++ });
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
            li.find('a').css('background', color).attr({ 'data-imageUrl': product.colors[color], 'data-color': color, 'data-index': index++ });
            $('#swapColor').append(li);
        }
        if (product.selectedColorIndex) {
            $('[swap-device-color]:nth(' + product.selectedColorIndex + ')').trigger('click');
        }
    })

    $('[data-color]').click(function () {
        var color = $(this).data();
        $('.pro-image').attr('src', $('.pro-image').data(color.color))
    })

    $('[data-price]').click(function () {
        var price = $(this).data();
        $('.price-f').text($('.price-f').data(price.price))
    })

    $(document).on('click', '[data-radio]', function () {
        if ($(this).is(':checked')) {
            var month = $(this).data('months');
            var storage = $('[data-swap-radio]:checked').data('storage');
            var paymentOptions = JSON.parse(localStorage.getItem('paymentOptions'));
            $('#priceFrom').text(paymentOptions[storage + "-" + month]);
        }
        else {

        }
    });

    $(document).on('click', '[data-swap-radio]', function () {
        if ($(this).is(':checked')) {
            $('#oneTimePrice').text($(this).data('price').toFixed(2));
            var month = $('[data-radio]:checked').data('months');
            var storage = $(this).data('storage');
            var paymentOptions = JSON.parse(localStorage.getItem('paymentOptions'));
            $('#priceFrom').text(paymentOptions[storage + "-" + month]);
        }
        else {

        }
    });

    $('[data-compare-color]').click(function () {
        $('[data-color-name]').text($(this).data('compare-color-name'));
        $('.color-bg').css("background", $(this).data('compare-color-code'));
    })



    $('[data-swap-toggle]').click(function () {
        if (selectedProduct == $('.set-device__image .set-device__image-item').length - 1) {
            selectedProduct = 0;
        }
        else {
            selectedProduct++;
        }

        console.log('selectedProduct swapbutton: ' + selectedProduct);
        $('.set-device__image-item').removeClass('set-device__image-item--large-image').addClass('set-device__image-item--small-image');
        $('.set-device__image-item:nth(' + selectedProduct + ')').removeClass('set-device__image-item--small-image').addClass('set-device__image-item--large-image');
        var product = $('.set-device__image .set-device__image-item:nth(' + selectedProduct + ')').data('prod-details');
        $('.p-item__content-name').find('p').text(product.brandName);
        $('.p-item__content-name').find('a').text(product.productName);
        $('#swapOneTimeVatPer, #swapPerMonthVatPer').text(product.vatPercentage + "% VAT inc");
        $('#swapOneTimePrice').text(product.oneTimePrice.toFixed(2));
        $('#swapPerMonthPrice').text(product.priceFrom.toFixed(2));
        $('.swap-storage-option,.swap-payment-option,#swapColor').empty();
        var arrStorage = [];
        for (var storage in product.storages) {
            arrStorage.push(Number(storage.substring(0, storage.length - 2)));
        }
        arrStorage.sort(function (a, b) {
            return a - b
        });
        var index = 0;
        for (var storage of arrStorage) {
            storage = storage + "GB";
            var div = $('<div>').addClass('radio-button');
            div.loadTemplate($('#swap-storage-template'), {
                storage: storage
            });
            div.find('input').attr({ 'data-price': product.storages[storage], 'data-storage': storage, 'data-index' : index++ });
            $('.swap-storage-option').append(div);
        }
        if (product.selectedStorageIndex) {
            $('[data-radio-swap-storage]:nth(' + product.selectedStorageIndex +')').trigger('click');
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
        
        index = 0;
        for (var color in product.colors) {
            var li = $('<li>');
            li.loadTemplate($('#swap-device-color-template'), {

            });
            li.find('a').css('background', color).attr({ 'data-imageUrl': product.colors[color], 'data-color': color, 'data-index': index++ });
            $('#swapColor').append(li);
        }
        if (product.selectedColorIndex) {
            $('[swap-device-color]:nth(' + product.selectedColorIndex + ')').trigger('click');
        }
    });

    $('[data-go-compare]').off("click").on("click", function () {

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
            return false;
        $('[pl-main]').hide();
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Product/_GetCompareDevices",
            data: { prodId1: productId1, prodId2: productId2, prodId3: productId3 },
            success: function (data, textStatus, XMLHttpRequest) {
                $('[pc-min]').html(data).show();
            },
            error: function (xHr) {
                return false;
            }
        });
    })


    $('[data-send-compare]').off('click').on('click', function () {
        $('.compare-wrap').addClass('fade-up');
        $('[pd-main]').hide();
        $('[pl-main]').show();
        $('body').removeClass('overlay-layer');
        $('[data-swipe-click]').trigger('click');
        $(".deleteDrop").trigger('click');

        var draggedItem = $('.p-item[data-item-id="' + current_item_id + '"]');
        var drag = draggedItem.clone().draggable({
            revert: "invalid",
            stack: ".p-item",
            refreshPositions: true,
            helper: 'clone',
            disabled: false
        });
        drag.appendTo($('.dropbox:first'));
        var cutomId = makeid(1);
        $('.dropbox:first').addClass("drop-product__item--product-droped").append("<div class='deleteDrop' id='" + cutomId + "'></div>");
        draggedItem.draggable({ disabled: true }).addClass('').attr('id', cutomId);
    });

    $('[data-compare-product-back]').click(function () {
        $('[pc-min]').hide();
        $('[pl-main]').show();
        $("[data-compare-close]").trigger('click');
    });

    $('[data-new-compare]').click(function () {
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

    $(document).on('click', '.device-color', function () {
        $('.device-color').removeClass("active");
        $(this).addClass("active");
        $('#productImageUrl').attr('src', $(this).attr('data-imageUrl'));
    })

    $(document).off('click', '.swap-device-color').on('click', '.swap-device-color', function () {
        $('.swap-device-color').removeClass("active");
        $(this).addClass("active");
        $('.set-device__image').find('img:nth(' + selectedProduct + ')').attr('src', $(this).attr('data-imageUrl'));
        var parent = $('.compare-product__product-item:nth(' + selectedProduct + ')');
        parent.find('.c-product__top-image img').attr('src', $(this).attr('data-imageUrl'));
        parent.find('[data-color-name]').text($(this).data('color'));
        parent.find('.lbl-product-color').css('background', $(this).data('color'));
        var product = $('.set-device__image-item:nth(' + selectedProduct + ')').data('prod-details');
        product.selectedColorIndex = $(this).data('index');
        $('.set-device__image .set-device__image-item:nth(' + selectedProduct + ')').data('prod-details', product);

    })

    $(document).on('click', '[data-radio-swap-payment]', function () {
        if ($(this).is(':checked')) {
            var month = $(this).data('months');
            var storage = $('[data-radio-swap-storage]:checked').data('storage');
            var product = $('.set-device__image-item:nth(' + selectedProduct + ')').data('prod-details');
            $('#swapPerMonthPrice').text(product.paymentOptions[storage + "-" + month]);
            var parent = $('.compare-product__product-item:nth(' + selectedProduct + ')');
            parent.find('.compare-product-pricefrom').text(product.paymentOptions[storage + "-" + month]);
            product.selectedPaymentIndex = $(this).data('index');
            $('.set-device__image .set-device__image-item:nth(' + selectedProduct + ')').data('prod-details', product);
        }
        else {

        }
    });

    $(document).on('click', '[data-radio-swap-storage]', function () {
        if ($(this).is(':checked')) {
            $('#swapOneTimePrice').text($(this).data('price').toFixed(2));
            var month = $('[data-radio-swap-payment]:checked').data('months');
            var storage = $(this).data('storage');
            var product = $('.set-device__image-item:nth(' + selectedProduct + ')').data('prod-details');
            $('#swapPerMonthPrice').text(product.paymentOptions[storage + "-" + month]);
            var parent = $('.compare-product__product-item:nth(' + selectedProduct + ')');
            parent.find('.compare-product-onetimeprice').text($(this).data('price').toFixed(2));
            parent.find('.compare-product-pricefrom').text(product.paymentOptions[storage + "-" + month]);
            parent.find('[data-capacity]').text(storage);
            product.selectedStorageIndex = $(this).data('index');
            $('.set-device__image .set-device__image-item:nth(' + selectedProduct + ')').data('prod-details', product);
        }
        else {

        }
    });

    var current_item_id = '';
    //$('[data-sp-back],[data-form-close]').click(function () {
    //    $('.p-item__large-main').addClass('p-item__large-main--hide');
    //    //  $('[pd-main]').addClass('add-zoom-out-effect');
    //    $('[pl-main]').show();
    //    $('.pd-main').addClass('pd-main--close');
    //    if (current_item_id != '') {
    //        $('.p-item').removeClass('add-zoom-out-effect');
    //        $('.p-item[data-item-id="' + current_item_id + '"]').addClass('add-zoom-out-effect');
    //    }
    //})

    $('[data-sp-back]').click(function () {
        $('[pl-main]').show();
        $('.pd-main').addClass('pd-main--close');
        $("[data-compare-close]").trigger('click');
    });

    $('.p-item').bind('click', function () {
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
                localStorage.setItem("paymentOptions", JSON.stringify(data.paymentOptions));
                $("#productImageUrl").attr("src", data.productImageUrl);
                $("#brandName").text(data.brandName);
                $("#productName").text(data.productName);
                $("#vatPercent,#oneTimeVatPercent").html(data.vatpercentage + "% VAT inc");
                $("#priceFrom").html(data.priceFrom);
                $("#oneTimePrice").html(data.oneTimePrice.toFixed(2));
                $('.storage-option,.payment-option,#colors').empty();
                var arrStorage = [];
                for (var storage in data.storages) {
                    arrStorage.push(Number(storage.substring(0, storage.length - 2)));
                }
                arrStorage.sort(function (a, b) {
                    return a - b
                });
                for (var storage of arrStorage) {
                    storage = storage + "GB";
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
                    li.find('a').css('background', color);
                    li.find('a').attr('data-imageUrl', data.colors[color]);
                    $('#colors').append(li);
                }
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
                //debugger;
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
        $('.p-item').trigger('click');
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
            drag.appendTo(droppable);
            var cutomId = makeid(1);
            $(this).append("<div class='deleteDrop' id='" + cutomId + "'></div>");
            ui.draggable.draggable({ disabled: true }).addClass('').attr('id', cutomId);
        }
    });
})
$('.p-item').on('dragstart', function (event) {
   
    $(".dropbox").droppable({ disabled: false });
    $('.content-body__product').addClass('content-body__product--drag');
    $('.content-body__bottom--compare-bottom').addClass('active');
    $('.content-body').addClass('active');
    $('.on-compare-button').addClass('active');

});
$('[data-swipe-click]').on('click', function (event) {
  
    event.stopPropagation();
    event.stopImmediatePropagation();
    $('.content-body__product').toggleClass('content-body__product--drag');
    $('.content-body__bottom--compare-bottom').toggleClass('active');
    $('.content-body').toggleClass('active');
    $('.on-compare-button').toggleClass('active');
    $(".deleteDrop").trigger('click');
})
$('[data-compare-close]').click(function () {
    $('.content-body__product').removeClass('content-body__product--drag');
    $('.content-body__bottom--compare-bottom').removeClass('active');
    $('.content-body').removeClass('active');
    $('.on-compare-button').removeClass('active');
    $(".deleteDrop").trigger('click');
})
$("html").on("drop", function (event) {
    // $(this).addClass("test");
});
$(document).on('click', 'div.ui-droppable>div.deleteDrop', function () {

    $(this).closest('.ui-droppable').removeClass('drop-product__item--product-droped');
    var _this = $(this);
    var deleteid = $(this).attr('id');
    $('html').find("#" + deleteid).draggable("enable");
    $(this).prev('.ui-draggable').remove();
    $(this).remove();

});


$(document).ready(function () {

    $('[data-number]').click(function () {
        var v = $(this).val();
        // alert('dsfsd')
        $('[data-input]').val($('[data-input]').val() + v);
    });

    //clicking equal sign evaluates the textarea
    // $('#equal').click(function(){
    //   $('[data-input]').val(eval($('[data-input]').val()));
    //   });


    $('[data-erase]').click(function () {
        $('[data-input]').val('');
    });


    // $('#backspace').click(function(){
    //     $('[data-input]').val($('[data-input]').val().substring(0, $('[data-input]').val().length - 1));
    //   });

    $(function () {
        var curDown = false,
            curYPos = 0,
            curXPos = 0;

        $('.scrollbar ').mousemove(function (m) {
            if (curDown) {
                this.scrollBy(curXPos - m.pageX, curYPos - m.pageY)
            }
        });

        $('.scrollbar ').mousedown(function (m) {
            curYPos = m.pageY;
            curXPos = m.pageX;
            curDown = true;
        });

        $('.scrollbar ').mouseup(function () {
            curDown = false;
        });
    })

});
