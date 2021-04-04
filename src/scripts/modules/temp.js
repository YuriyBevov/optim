$(function () {

    ///////////////
    // Scroll {

    $(window).scroll(function () {
        let menu = $('.menu');

        if (window.pageYOffset > 150) {
            menu.addClass('menu--fixed');
        } else {
            menu.removeClass('menu--fixed');
        }
    });
    // } Scroll
    ///////////////


    /////////////////
    // Menu {
    $('.menu__button').on('click', function () {
        $('.menu').toggleClass('menu--active');
        $('.menu__list').toggle();
    });
    // } Menu 
    ////////////


    ////////////////////////
    // Quiz {
    function collectQuizData() {        
        return $("#quiz-form").serialize();
    }

    function successfullySentQuizData(data) {
        var a = 0;
        // Do nothing. For debugging purpose only.
    }

    function failedSendingQuizData(jqXHR, textStatus, errorThrown) {
        var a = 0;
        // Do nothing. For debugging purpose only.
    }

    function sendDataToServer(dataForSending) {
        var currentPageUrl = window.location.href;
        $.ajax({
            type: "POST",
            url: currentPageUrl,
            data: dataForSending,
            success: function (data) { successfullySentQuizData(data); },
            dataType: "json",
            error: function (jqXHR, textStatus, errorThrown) { failedSendingQuizData(jqXHR, textStatus, errorThrown); }
        });
    }

    function startQuiz(){
        var $quizInvitation = $("#quiz-invitation");
        hidePassedQuizBox($quizInvitation);
        var $firstQuizAnswer = $("#your-city");
        activateQuizAnswer($firstQuizAnswer);        
    }


    function hidePassedQuizBox($element) {
        // $currentQuizBox.parent().prev().addClass('quiz__background--active');
        $element.addClass('hidden');
    }

    function activateQuizAnswer($quizAnswer) {
        $quizAnswer.addClass('quiz__answer--active');
    }

    function handleCurrentQuizBoxButtonClick($quizButton) {
        var $currentQuizBox = $quizButton.closest(".quiz__answer, .quiz__box");
        if ($currentQuizBox.attr("id") == "quiz-invitation"){
            startQuiz();
        } else {
            var successful = handleQuizAnswers($currentQuizBox);
            if (successful) {
                hidePassedQuizBox($currentQuizBox);
                $nextQuizAnswer = $currentQuizBox.next();
                if ($nextQuizAnswer.hasClass("quiz__thx")){
                    // Finalize quiz as the next element is already a message of thanks.
                    finalizeQuiz($currentQuizBox);
                }
                activateQuizAnswer($nextQuizAnswer);
            }            
        }        
    }

    function cloneAndHideInput($inputField){
        var $quizForm = $("#quiz-form");
        var $clonedCurrentInput = $inputField.clone();            
        $clonedCurrentInput.attr("type", "hidden");
        if ($inputField.val()){     
            $clonedCurrentInput.attr('value', $inputField.val());
            $quizForm.append($clonedCurrentInput);            
        } 
    }


    function handleQuizAnswers($quizBox) {                
        var $currentQuizBoxInputs = $quizBox.find('.quiz__answer-input');
        var result = true;
        $currentQuizBoxInputs.each(function () {
            var $currentInput = $(this);
            var $inputValue = $currentInput.val();
            if (!$inputValue && $currentInput.attr("required")){
                result = false;                		
            }            
            cloneAndHideInput($currentInput);            
        });
        return result;
    }


    function finalizeQuiz($currentQuizBox) {
        $currentQuizBox.removeClass('quiz__answer--active');
        // $finalizeQuizButton.parent().parent().parent().parent().prev().removeClass('quiz__background--active');
        var quizData = collectQuizData();
        sendDataToServer(quizData);
    }

    // } Quiz
    ////////////


    /////////////////////
    // Application form {

    function collectApplicationFormData($applicationForm) {        
        var data = $applicationForm.serialize();
        return data;
    }

    function resizeThanksElement($applicationForm, $thanksElement){
        var width = $applicationForm.width();
        var height = $applicationForm.height();
        
        $thanksElement.width(width);
        $thanksElement.height(height);
    }

    function revealThanks($applicationForm, $thanksElement){
        $applicationForm.addClass("hidden");
        $thanksElement.removeClass("hidden");
    }


    function sayThanksForApplication($applicationForm, $thanksElement) {
        resizeThanksElement($applicationForm, $thanksElement);
        revealThanks($applicationForm, $thanksElement);
    }

    // } Application form
    /////////////////////

    function validateApplicationForm($applicationForm){
        var $required_elements = $applicationForm.find('input,textarea').filter(["required", "visible"])["prevObject"];
        var success = true;
        $required_elements.each(function(){
            var $current_element = $(this);		
            var value = $current_element.val();
            if (!value){
                success = false;
            }
            if  ( $current_element.is(':checkbox')){
                if (!$current_element.is(":checked")){
                    success = false;	
                }
            }            
        });
        return success;
    }        

    function addEventListeners() {
        var $quizAnswerButtons = $('.quiz__answer-btn, .quiz__box-link');
        $quizAnswerButtons.click(function () {
            handleCurrentQuizBoxButtonClick($(this));
        });        

        var $applicationSubmitButton = $("#application-form-button");
        $applicationSubmitButton.click(function(){
            var $applicationForm = $("#application-form");
            var applicationFormData = collectApplicationFormData($applicationForm);
            var success = validateApplicationForm($applicationForm)

            if (success) {
                sendDataToServer(applicationFormData);
            
                var $thanksElement = $("#application-thanks");
                sayThanksForApplication($applicationForm, $thanksElement);
            }
        });
    }

    function preventAllFormsFromSubmitting() {
        var $forms = $("form");

        $forms.submit(function (event) {
            event.preventDefault();
        });
    }

    preventAllFormsFromSubmitting();
    addEventListeners();

});