function EmiCalculator(){

  var month = $("#emiMonth").val();
  var rate = $("#InterestRate").val();
  var pamt = $("#plAmount").val();
  
   var monthlyInterestRatio = (rate/100)/12;
   var monthlyInterest = parseInt(monthlyInterestRatio*pamt);
   var top = Math.pow((1+monthlyInterestRatio),month);
   var bottom = top -1;
   var sp = top / bottom;
   var emi = ((pamt * monthlyInterestRatio) * sp);
   var result = emi.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); //done
   var tA = (emi*month).toFixed(2);
   var totalAmount = parseInt(emi*month).toLocaleString('en-IN'); //done
   var tI = (tA-pamt);
   var totalInterest = parseInt(tI).toFixed(2);
   var principal = parseInt(pamt).toLocaleString('en-IN');


   document.getElementById('pa').innerHTML = principal;
   document.getElementById('in').innerHTML = rate;
   document.getElementById('te').innerHTML = month;
   $("#result").empty();
   $("#result").append("Rs."+result);
   $("#totalAmount").empty();
   $("#totalAmount").append("Rs."+totalAmount);
   $("#totalInterest").empty();
   $("#totalInterest").append(+totalInterest);
   $("#principal").empty();
   $("#principal").append("Rs."+principal);


   $('#plAmount').on('input',function () {
  
  var newVal = $(this).val();

  $("#pa").val(newVal);
});
$('#pa').on('input', function(){
  $('#plAmount').val($(this).val())
});


$('#InterestRate').on('input',function () {
  
  var newVal = $(this).val();

  $("#in").val(newVal);
});
$('#in').on('input', function(){
  //console.log($(this).val())
  $('#InterestRate').val($(this).val())
});


$('#emiMonth').on('input',function () {
  
  var newVal = $(this).val();

  $("#te").val(newVal);
});
$('#te').on('input', function(){
  //console.log($(this).val())
  $('#emiMonth').val($(this).val())
});

$("input[type=range]").change(function(){
  EmiCalculator();
  drawChart();
});

$("input[type=range]").keypress(function(){
    EmiCalculator();
  drawChart();
});
}

//Restricts users from typing other than numbers and dot.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

// Restrict input to digits and '.' by using a regular expression filter.
setInputFilter(document.getElementById("pa"), function(value) {
  return /^\d*\.?\d*$/.test(value);
});
setInputFilter(document.getElementById("in"), function(value) {
  return /^\d*\.?\d*$/.test(value);
});
setInputFilter(document.getElementById("te"), function(value) {
  return /^\d*\.?\d*$/.test(value);
});