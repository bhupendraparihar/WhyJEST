jest
  .dontMock('fs')
  .dontMock('jquery');

var $ = require('jquery');
var html = require('fs').readFileSync('./app.html').toString();

describe('validateSubmits', function() {
  
  it('shows/hides error banner', function() {
    document.documentElement.innerHTML = html;
    
    // initial state
    expect($('#err').hasClass('hidden')).toBeTruthy();
    
    // submit blank form, get an error
    $('form').submit();
    expect($('#err').hasClass('hidden')).toBeFalsy();
    
    // fill out completely, error gone
    $('#username').val('Bob');
    $('#password').val('123456');
    $('form').submit();
    expect($('#err').hasClass('hidden')).toBeTruthy();
  });
  
  it('adds/removes error classes to labels', function() {
    document.documentElement.innerHTML = html;
    
    // initially - no errors
    expect($('#username-label').hasClass('error')).toBe(false);
    expect($('#password-label').hasClass('error')).toBe(false);

    // errors
    $('form').submit();
    expect($('#username-label').hasClass('error')).toBe(true);
    expect($('#password-label').hasClass('error')).toBe(true);
    
    // fill out username, missing password still causes an error
    $('#username').val('Bob');
    $('form').submit();
    expect($('#username-label').hasClass('error')).toBe(false);
    expect($('#password-label').hasClass('error')).toBe(true);

    // add the password already
    $('#password').val('123456');
    $('form').submit();
    expect($('#username-label').hasClass('error')).toBe(false);
    expect($('#password-label').hasClass('error')).toBe(false);
  });

});

