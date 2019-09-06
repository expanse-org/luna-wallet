var hashCode;
const numberToBN = require('number-to-bn');
const Gwei = 1000000000;
var transaction_list_hash , updated_transaction_list_hash;
//menu items

function mainMenu(evt, cityName,accountHash) {
   console.log("i a m clicked",evt);
   let total_balance = $(this).attr('data-balance');
   console.log("total_balance",total_balance);
  setTimeout(function(){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    
  },300)
  $('.sendAmount').val(00);
  $('.sendTo').val('');
  $('.error-message').hide();
  evt.currentTarget.className += " active";

}


//Menu
$(function() {
    $(".open-btn").click(function() {
      $(this).toggleClass("active");
      console.log('toggle drawer',this);
      $('.menu-drawer').toggleClass("open");
    });

    $('.toggle-accout-detail-qr').click(function(){
      $('#qrCode').toggleClass("hide");
      $(this).text(function(i, v){
        console.log(v);
        return v == 'Show qr-code' ? 'Hide qr-code' : 'Show qr-code'
     })
    })
  });


//modals

        $(document).ready(function(){
          $('.generate').click(function(){
            $('.error-message').hide();
          })
          //modal-1
          $('.close,.cancel').click(function(){
            let target = $(this).attr('data-modal');
            console.log("target",target);
            if(target){
              $(target).removeClass("open-modal");
              
            }
            $('form').trigger("reset");
          });
          
          $("#openbtn-1").click(function(){

              $("#modal-1").addClass("open-modal");
              // $('.layer-opacity').show();

          });
          $("#closebtn-1").click(function(){

            $("#modal-1").removeClass("open-modal");
            // $('.layer-opacity').show();
          });
          //modal-2
          $("#openbtn-2").click(function(){

              $("#modal-2").addClass("open-modal");
              // $('.layer-opacity').show();

          });
          $("#closebtn-2").click(function(){

            $("#modal-2").removeClass("open-modal");
            // $('.layer-opacity').show();
          });
          //modal-3
          $("#openbtn-3").click(function(){

              $("#modal-3").addClass("open-modal");
              console.log("modeal 3 open");
              // $('.layer-opacity').show();

          });
          $("#closebtn-3").click(function(){

            $("#modal-3").removeClass("open-modal");

          });

          //modal-4
          $("#openbtn-4").click(function(){
            $("#modal-4").addClass("open-modal");

            // const ipcRenderer = require('electron').ipcRenderer;
            // ipcRenderer.send('AddNewAccountWindow', 'OpenNewAccountWindow');
          });
          //transaction-modal
         
        $("#close-transaction").click(function(){

          $("#transaction-modal").removeClass("open-modal");
          
        });
        //event modal
        $("#event").click(function(){
          console.log("transaction modal");
          $("#event-modal").addClass("open-modal");

      });
      $("#close-event").click(function(){

        $("#event-modal").removeClass("open-modal");
      });
      // send-transaction
     
    $("#close-send").click(function(){

      $("#send-modal").removeClass("open-modal");
    });
      
    $('.md-trigger').click(function(){
      // $('.layer-opacity').show();
    })
      
    $('.layer-opacity').click(function(){
      $(this).hide();
      // $('.md-close').trigger("click");
    })

         
          //receive-modal

          $("#receive").click(function(){
            $("#receive-modal").addClass("open-modal");

        }); // d
        $("#close-receive").click(function(){

          $("#receive-modal").removeClass("open-modal");
        });
       
          $("#closebtn-4").click(function(){

            $("#modal-4").removeClass("open-modal");
          });



          //dropdown
          var x, i, j, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select1":*/
        x = document.getElementsByClassName("custom-select1");
        for (i = 0; i < x.length; i++) {
          selElmnt = x[i].getElementsByTagName("select")[0];
          /*for each element, create a new DIV that will act as the selected item:*/
          a = document.createElement("DIV");
          a.setAttribute("class", "select-selected");
          a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
          x[i].appendChild(a);
          /*for each element, create a new DIV that will contain the option list:*/
          b = document.createElement("DIV");
          b.setAttribute("class", "select-items select-hide");
          for (j = 0; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                  if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                      y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                  }
                }
                h.click();
            });
            b.appendChild(c);
          }
          x[i].appendChild(b);
          a.addEventListener("click", function(e) {
              /*when the select box is clicked, close any other select boxes,
              and open/close the current select box:*/
              e.stopPropagation();
              closeAllSelect(this);
              this.nextSibling.classList.toggle("select-hide");
              this.classList.toggle("select-arrow-active");
            });
        }
        function closeAllSelect(elmnt) {
          /*a function that will close all select boxes in the document,
          except the current select box:*/
          var x, y, i, arrNo = [];
          x = document.getElementsByClassName("select-items");
          y = document.getElementsByClassName("select-selected");
          for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
              arrNo.push(i)
            } else {
              y[i].classList.remove("select-arrow-active");
            }
          }
          for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
              x[i].classList.add("select-hide");
            }
          }
        }
         var p = document.querySelector(".tabcontent")
                  //****************************************************************************select js for participate page   *******************************************************************************************
                  var path = window.location.pathname;
                  var page = path.split("/").pop();
                var x = $('.tabcontent').css('display');

                 // if(x=='participate' && p.display == 'block') {

                      var x, i, j, selElmnt, a, b, c;
                      /*look for any elements with the class "custom-select":*/
                      x = document.getElementsByClassName("custom-select");
                      for (i = 0; i < x.length; i++) {
                        selElmnt = x[i].getElementsByTagName("select")[0];
                        /*for each element, create a new DIV that will act as the selected item:*/
                        a = document.createElement("DIV");
                        a.setAttribute("class", "select-selected");
                        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                        x[i].appendChild(a);
                        /*for each element, create a new DIV that will contain the option list:*/
                        b = document.createElement("DIV");
                        b.setAttribute("class", "select-items select-hide");
                        for (j = 0; j < selElmnt.length; j++) {
                          /*for each option in the original select element,
                          create a new DIV that will act as an option item:*/
                          c = document.createElement("DIV");
                          c.innerHTML = selElmnt.options[j].innerHTML;
                          c.addEventListener("click", function(e) {
                              /*when an item is clicked, update the original select box,
                              and the selected item:*/
                              var y, i, k, s, h;
                              s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                              h = this.parentNode.previousSibling;
                              for (i = 0; i < s.length; i++) {
                                if (s.options[i].innerHTML == this.innerHTML) {
                                  s.selectedIndex = i;
                                  h.innerHTML = this.innerHTML;
                                  y = this.parentNode.getElementsByClassName("same-as-selected");
                                  for (k = 0; k < y.length; k++) {
                                    y[k].removeAttribute("class");
                                  }
                                  this.setAttribute("class", "same-as-selected");
                                  break;
                                }
                              }
                              h.click();
                          });
                          b.appendChild(c);
                        }
                        x[i].appendChild(b);
                        a.addEventListener("click", function(e) {
                            /*when the select box is clicked, close any other select boxes,
                            and open/close the current select box:*/
                            e.stopPropagation();
                            closeAllSelect(this);
                            this.nextSibling.classList.toggle("select-hide");
                            this.classList.toggle("select-arrow-active");
                          });
                      }
                      function closeAllSelect(elmnt) {
                        /*a function that will close all select boxes in the document,
                        except the current select box:*/
                        var x, y, i, arrNo = [];
                        x = document.getElementsByClassName("select-items");
                        y = document.getElementsByClassName("select-selected");
                        for (i = 0; i < y.length; i++) {
                          if (elmnt == y[i]) {
                            arrNo.push(i)
                          } else {
                            y[i].classList.remove("select-arrow-active");
                          }
                        }
                        for (i = 0; i < x.length; i++) {
                          if (arrNo.indexOf(i)) {
                            x[i].classList.add("select-hide");
                          }
                        }
                      }
                      document.addEventListener("click", closeAllSelect);
                //  }

        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);

        var etherPrice = document.getElementById("price"),
        res = document.getElementById("result");

        etherPrice.addEventListener("input", function() {
            let value = (etherPrice.value)/100000;
              res.innerHTML = value + " Exp ";
          }, false);

        }); // Document Ready function ended

        listTransactions = (postData, parentClass) => {
          var filter;

          const axios = require('axios');
          const object_hash = require('object-hash');
          console.log("transactions called");
          if(parentClass =="dashboardTransactionContent") {
              filter =  $("#filterMainTransaction").val();
          }
          if(parentClass== "accountDetailsTransactionContent") {
            filter =  $("#filterDetailsTransaction").val();
          }
    
          axios.post('https://api.gander.tech/getalltransactionsbyaddressarray', postData)
          .then(function (response) {
              console.log("response-transactions",response)
              let transactions = response.data.message;
              transaction_list_hash = object_hash(transactions);
              if( transaction_list_hash == updated_transaction_list_hash && !filter){
                  console.log("transactions",transaction_list_hash,updated_transaction_list_hash);
                  return false; die();
              }else{
                updated_transaction_list_hash = transaction_list_hash;
              }

              console.log("-------LISTING TRANSACTIONS");
              //transaction.blockHash==filter || transaction.from==filter || transaction.to ==filter
              var from = "from";
              let transactionsTemplate;
              if(transactions && transactions.length > 0){
                $('.latestTransaction').show();
                $('.'+parentClass).html('');
                $('.accountDetailsTransactionContent').html('');
                $('.transactionLoader').hide(200);
                _.each( transactions, function( transaction , key ) {
                  if(transaction.Type != 'mined_transaction' && !filter){
                    var value = numberToBN(transaction.value); // Convert the result to a usable number string
                    value = value;
                    value =  web3.fromWei(value, 'ether');
                    transactionsTemplate  =  '<div class="row transactionDetail md-trigger" data-modal="modal-4" data-transactionId="'+transaction.hash+'">'
                    transactionsTemplate +=  '<label class="date">'+ moment(transaction.timestampDecimal).format('MMM-DD')+'</label>'
                    transactionsTemplate +=  '<label class="status">'
                    if(transaction.transactionStatus == 'Pending'){
                      transactionsTemplate +=  '<strong>'+transaction.transactionStatus+'</strong>';
                    }else{
                      transactionsTemplate +=  transaction.transactionStatus
                    }
                    
                    transactionsTemplate +=  '</label>'
                    transactionsTemplate +=  '<div class="account"><div class="fromAccount">'
                    transactionsTemplate +=   (transaction.from != "") ? transaction.from : from  
                    transactionsTemplate +=  '</div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
                    transactionsTemplate +=  'x="0px" y="0px" width="11px" height="19px" viewBox="0 0 11 19" style="enable-background:new 0 0 11 19;" xml:space="preserve">'
                    transactionsTemplate +=  '<path class="arrow" d="M0,11.6V19l0,0l11-9.4L0,0l0,0V11.6z"/>'
                    transactionsTemplate +=  '</svg>'
                    transactionsTemplate +=  '<div class="toAccount">'+ transaction.to +'</div>'
                    transactionsTemplate +=  '</div>'
                    transactionsTemplate +=  '<label class="amount"><span>'+ value +' Exp</span>'
                    transactionsTemplate +=  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
                    transactionsTemplate +=  'x="0px" y="0px" width="24px" height="24px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve">'
                    transactionsTemplate +=  '<path class="open" d="M0,17.5C0,7.8,7.8,0,17.5,0S35,7.8,35,17.5S27.2,35,17.5,35S0,27.2,0,17.5z M31.5,17.5'
                    transactionsTemplate +=  'c0-7.7-6.3-14-14-14s-14,6.3-14,14s6.3,14,14,14S31.5,25.2,31.5,17.5z M10.8,17.9l0.8-0.2L10.8,17.9l8.4-11.5l1.6,1.2l-7.5,10.3'
                    transactionsTemplate +=  'l7.7,10L19.3,29L10.8,17.9z"/>'
                    transactionsTemplate +=  '</svg>'
                    transactionsTemplate +=  '</label>'
                    transactionsTemplate +=  '</div>'
                    
                    $('.'+parentClass).append(transactionsTemplate);
                  } else if(transaction.Type != 'mined_transaction' && (transaction.blockHash.indexOf(filter)!=-1 || transaction.from.indexOf(filter)!=-1 || transaction.to.indexOf(filter)!=-1)){
                    var value = numberToBN(transaction.value); // Convert the result to a usable number string
                    value = value;
                    value =  web3.fromWei(value, 'ether');
                    transactionsTemplate  =  '<div class="row transactionDetail md-trigger" data-modal="modal-4" data-transactionId="'+transaction.hash+'">'
                    transactionsTemplate +=  '<label class="date">'+ moment(transaction.timestampDecimal).format('MMM-DD')+'</label>'
                    transactionsTemplate +=  '<label class="status">'
                    if(transaction.transactionStatus == 'Pending'){
                      transactionsTemplate +=  '<strong>'+transaction.transactionStatus+'</strong>';
                    }else{
                      transactionsTemplate +=  transaction.transactionStatus
                    }
                    
                    transactionsTemplate +=  '</label>'
                    transactionsTemplate +=  '<div class="account"><div class="fromAccount">'
                    transactionsTemplate +=   (transaction.from != "") ? transaction.from : from  
                    transactionsTemplate +=  '</div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
                    transactionsTemplate +=  'x="0px" y="0px" width="11px" height="19px" viewBox="0 0 11 19" style="enable-background:new 0 0 11 19;" xml:space="preserve">'
                    transactionsTemplate +=  '<path class="arrow" d="M0,11.6V19l0,0l11-9.4L0,0l0,0V11.6z"/>'
                    transactionsTemplate +=  '</svg>'
                    transactionsTemplate +=  '<div class="toAccount">'+ transaction.to +'</div>'
                    transactionsTemplate +=  '</div>'
                    transactionsTemplate +=  '<label class="amount"><span>'+ value +' Exp</span>'
                    transactionsTemplate +=  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
                    transactionsTemplate +=  'x="0px" y="0px" width="24px" height="24px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve">'
                    transactionsTemplate +=  '<path class="open" d="M0,17.5C0,7.8,7.8,0,17.5,0S35,7.8,35,17.5S27.2,35,17.5,35S0,27.2,0,17.5z M31.5,17.5'
                    transactionsTemplate +=  'c0-7.7-6.3-14-14-14s-14,6.3-14,14s6.3,14,14,14S31.5,25.2,31.5,17.5z M10.8,17.9l0.8-0.2L10.8,17.9l8.4-11.5l1.6,1.2l-7.5,10.3'
                    transactionsTemplate +=  'l7.7,10L19.3,29L10.8,17.9z"/>'
                    transactionsTemplate +=  '</svg>'
                    transactionsTemplate +=  '</label>'
                    transactionsTemplate +=  '</div>'
                    
                    $('.'+parentClass).append(transactionsTemplate);
                  }
                });
              } else {
                // console.log("heree")
                $('.latestTransaction').hide();
                $('.'+parentClass).html('');
                $('.transactionLoader').hide(1000);
                transactionsTemplate  =  '<div class="row">'
                transactionsTemplate = '<h3>No Transactions Found</h3>'
                transactionsTemplate +=  '</div>'
                $('.'+parentClass).append(transactionsTemplate);
              } 
            })
            .catch(function (error) {
              console.log(error);
              Raven.captureException(error);
            });
      }

      $('.tokenName').keyup(function() {       
        $('.token_values .expanse label:first').text($(this).val());
      });

      $('input.token_symbol').keyup(function(){
        console.log($(this).val())
        $('.token_values .expanse span.token_symbol').text($(this).val())
      })
      // $('.token_values')
    

        ///             Add Account Form 

        $('.showPass').change(function() {
          console.log("show pass working");
          let type      = $(this).attr('data-type');
          let target    = $(this).attr('data-target');
          if (type == 'text') {
              $(target).attr('type', 'password');
              $(this).attr('data-type', 'password');
          } else {
          $(target).attr('type', 'text');
          $(this).attr('data-type', 'text');
          }
      });
      $('.showPass1').change(function() {
        let type      = $(this).attr('data-type');
        let target1    = $(this).attr('data-target1');
        let target2    = $(this).attr('data-target2');
        if (type == 'text') {
            $(target1).attr('type', 'password');
            $(target2).attr('type', 'password');
            $(this).attr('data-type', 'password');
        } else {
        $(target1).attr('type', 'text');
        $(target2).attr('type', 'text');
        $(this).attr('data-type', 'text');
        }
    });
      function accounts(evt, tabaccount) {
          var i, tabchange, tablinks;
          tabchange = document.getElementsByClassName("tabchange");
          for (i = 0; i < tabchange.length; i++) {
              tabchange[i].style.display = "none";
          }
          tablinks = document.getElementsByClassName("tablinks");
          for (i = 0; i < tablinks.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" active", "");
          }
          document.getElementById(tabaccount).style.display = "block";
          evt.currentTarget.className += " active";
      }

      

        $('.change_import_accounts_tabs').on('change',function(){
          var target = $(this).find(':selected').val();
          var target_tab = $(this).find(':selected').attr('data-target');
          console.log("import type changed",target,target_tab);
          let tabchange = document.getElementsByClassName("importtabchange");
            for (i = 0; i < tabchange.length; i++) {
              tabchange[i].style.display = "none";
          }

          // document.getElementById("fields-Privat-key").style.display = "block";
          // document.getElementById("fields-address").style.display = "none";
          document.getElementById(target_tab).style.display = "block";
          $('.import-submit-btn').attr('data-target', target);
          $('form').trigger('reset');
          $('.error-message').css({visibility:"visible"});$('.error-message').hide();

        })

      
      function privatekey(fClass) {
          
          $('.import-submit-btn').attr('data-target', fClass);
      }

      function address(fClass) {
          document.getElementById("fields-address").style.display = "block";
          document.getElementById("fields-Privat-key").style.display = "none";
          document.getElementById("file-upload").style.display = "none";
          $('.import-submit-btn').attr('data-target', fClass);
      }
      function fileupload(fClass) {
          document.getElementById("file-upload").style.display = "block";
          document.getElementById("fields-Privat-key").style.display = "none";
          document.getElementById("fields-address").style.display = "none";
          $('.import-submit-btn').attr('data-target', fClass);
      }
      
    $(".add-account-cancel").click(function(){
      const ipcRenderer = require('electron').ipcRenderer;
      ipcRenderer.send('CloseNewAccountWindow', 'CloseNewAccountWindow');
    });
    $(document).on("click",".transactionDetail",function() {
      console.log("transaction modal",$(this).attr('data-transactionId'));
      const trx_id = $(this).attr('data-transactionId');
      const axios = require('axios');
      let postData = {
        hash : trx_id
      }
          axios.post('https://beta-api.gander.tech/gettransactionbyhash', postData)
          .then(function (response) {
            console.log("Transaction Detail Response", response)
            let res = response.data.message.transaction_info;
            $('.transaction_details .trx_hash').text(res.hash);
            let trx_time = moment(res.timestampDecimal).local().format('LLLL')
            let trx_timeFromNow = moment(res.timestampDecimal, "YYYYMMDD").fromNow();
            $('.transaction_details .trx_time').html(trx_time+'<br/><span>( '+trx_timeFromNow+' )</span>');

            $('.transaction_details .trx_amount').text(res.valueDecimal+' Exp');
            $('.transaction_details .trx_from').text(res.from);
            $('.transaction_details .trx_to').text(res.to);
            let gasUsed = numberToBN(response.data.message.transaction_recipt_info.gasUsed);
            $('.transaction_details .trx_fee_paind').text(gasUsed); 
            $('.transaction_details .tex_gass_used').text(gasUsed); 
            var gas = numberToBN(res.gas); // Convert the result to a usable number string
            gas = gas * Gwei;
            gas =  web3.fromWei(gas, 'ether');
            console.log("gas",gas);
            $('.transaction_details .tex_gass_limit').text(gas * Gwei +"(GWei)");
            var gasPrice = numberToBN(res.gasPrice); // Convert the result to a usable number string
            gasPrice = gasPrice * Gwei;
            gasPrice =  web3.fromWei(gasPrice, 'ether');
            $('.transaction_details .trx_block').text(res.blockNumberDecimal);
            $('.transaction_details .trx_block').attr('href','https://gander.tech/block/1271785');
            
            $('.transaction_details .trx_gass_price').text(gasPrice+ " (GWei)");
            // $('.transaction_details .trx_amount').text(res.hash);
            // $('.transaction_details .tex_gass_used').text(res.hash);
            // $('.transaction_details .tex_gass_used').text(res.hash);
            console.log("transaction modal");
            // $("#transaction-modal").addClass("open-modal");
            $("#transaction-modal").addClass("md-show");

          }).catch(function (error) {
            console.log(error);
            Raven.captureException(error);
          });
     
    });  

    $(document).on('click','.md-trigger',function(){
      $('.md-overlay').addClass('md-show');
    })
    // $('.md-trigger').click(function(){
    //   $('.md-overlay').addClass('md-show');
    // });
    $('.md-overlay').click(function(){
      $(this).removeClass('md-show');
      $('.md-modal').each(function() {
        $( this ).removeClass( "md-show" );
      });
      $('form').trigger('reset');
      $('.error-message').hide();
      $('.error-message').css({visibility : "hidden"});
      $('body input,textarea').removeClass('error');
      $('.alert-unsucess').hide();
      $('.alert-sucess').hide();
      $('.contract_functions_details').html('');
    });
    $('.md-close').click(function(){
      $('.md-overlay').trigger('click');
    });
    $('.openAddAccountModal').click(function(){
      $('.tab-modal .tablinks').each(function() {
        $( this ).removeClass( "active" );
      });
      $('.account-page .tabchange').each(function(){
        $( this ).hide();
      });
      setTimeout(function(){
        $('.tab-modal .tablinks:first').addClass('active');
        $('#create-new-account').show();      
      },50)
      $('.impoortAccounts_dropdown .select-list li:first-child span').trigger('click');
      
    });

    $('input,textarea,select').focus(function(){
      $( this ).removeClass('error');
      $( this ).parent().siblings(".error-message").hide();
      $( this ).siblings(".error-message").css({visibility: "visible"});
      $( this ).siblings(".error-message").hide();
      $( this ).parent().siblings(".error-message").css({visibility: "visible"});
      $( this ).siblings().children(".error-message").hide();
      $( this ).siblings().children(".error-message").css({visibility: "visible"});
      var tar = $(this).attr('data-err');
      try{if(tar != undefined && tar != ''){$(tar).hide();}}catch(e){console.log(e)}
    });

    $(".input_number").keydown(function (event) {


      if (event.shiftKey == true) {
          event.preventDefault();
      }

      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {

      } else {
          event.preventDefault();
      }
      
      // if($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
      //     event.preventDefault();

  });

  $('.input_number').keyup(function(){
    var val = $(this).val();
    console.log("val",val);
    if(val == ""){$(this).val(0)}
  });

  