const input = document.querySelector('#upload-file');
const editImageForm = document.querySelector('.img-upload__overlay');
const editedImage = document.querySelector('.img-upload__preview img');

const toDefaultValues = () => {
  editImageForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  input.files = null;
};

const onEscRemove = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    toDefaultValues();
    document.removeEventListener('keydown', onEscRemove);
  }
};

editImageForm.querySelector('#upload-cancel').addEventListener('click', () => {
  toDefaultValues();
  document.removeEventListener('keydown', onEscRemove);
});

input.addEventListener('change', () => {
  console.log(input.files);

  editImageForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onEscRemove);

  editedImage.src = URL.createObjectURL(input.files[0]);
});

