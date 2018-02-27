'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var setupWizard = document.querySelector('.setup-wizard');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвин'];
var coatColorList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorList = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColorList = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var wizards = [];

for (var i = 0; i < 4; i++) {
  var wizardObj = {
    name: names[getRandomInt(0, names.length)] + ' ' + surnames[getRandomInt(0, surnames.length)],
    coatColor: coatColorList[getRandomInt(0, coatColorList.length)],
    eyesColor: eyesColorList[getRandomInt(0, eyesColorList.length)]
  };
  wizards.push(wizardObj);
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupUserName = document.querySelector('.setup-user-name');

var onPopupKeydownPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (evt.target === setupUserName) {
      setupUserName.value = '';
    } else {
      closePopup();
    }
  }
  if (evt.keyCode === ENTER_KEYCODE) {
    if (evt.target === setupClose) {
      closePopup();
    }
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupKeydownPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupKeydownPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});


var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireballWrap = document.querySelector('.setup-fireball-wrap');

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = coatColorList[getRandomInt(0, coatColorList.length)];
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = eyesColorList[getRandomInt(0, eyesColorList.length)];
});

fireballWrap.addEventListener('click', function () {
  fireballWrap.style.backgroundColor = fireballColorList[getRandomInt(0, fireballColorList.length)];
});
