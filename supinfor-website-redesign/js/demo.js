/**
 * Demo page — form validation & submission
 */
(function() {
  function showToast(msg, type) {
    var toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast ' + type + ' show';
    setTimeout(function() { toast.classList.remove('show'); }, 5000);
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function clearError(id) {
    var el = document.getElementById(id);
    var errEl = document.getElementById('err-' + id);
    if (el) el.classList.remove('invalid');
    if (errEl) errEl.textContent = '';
  }

  function setError(id, msg) {
    var el = document.getElementById(id);
    var errEl = document.getElementById('err-' + id);
    if (el) el.classList.add('invalid');
    if (errEl) errEl.textContent = msg;
  }

  ['firstName', 'lastName', 'email', 'phone'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function() { clearError(id); });
  });

  var form = document.getElementById('demoForm');
  var submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var emailReg = /^.+@\w+\..+$/;
    var hasError = false;

    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();

    ['firstName', 'lastName', 'email', 'phone'].forEach(clearError);

    if (!firstName) { setError('firstName', 'First name is required'); hasError = true; }
    if (!lastName) { setError('lastName', 'Last name is required'); hasError = true; }
    if (!email) {
      setError('email', 'Email is required'); hasError = true;
    } else if (!emailReg.test(email)) {
      setError('email', 'Please enter a valid email'); hasError = true;
    }
    if (!phone) { setError('phone', 'Phone number is required'); hasError = true; }

    if (!email || !emailReg.test(email)) return;
    if (hasError) return;

    var casesChecked = [];
    document.querySelectorAll('#casesGroup input[type="checkbox"]:checked').forEach(function(cb) {
      casesChecked.push(cb.value);
    });

    var params = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      city: document.getElementById('city').value,
      company: document.getElementById('company').value.trim(),
      position: document.getElementById('position').value.trim(),
      people: document.getElementById('people').value,
      work: document.getElementById('work').value,
      cases: casesChecked.join(','),
      industry: document.getElementById('industry').value.trim(),
      message: document.getElementById('message').value.trim(),
      source: getQueryParam('source') ? Number(getQueryParam('source')) : 1
    };

    console.log('Submit params:', params);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    var API_URL = window.__CONFIG__ && window.__CONFIG__.API_BASE || 'https://api.supinfor.com';
    fetch(API_URL + '/api/v1/official/index', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    .then(function(response) { return response.json(); })
    .then(function(res) {
      if (res.code === 200) {
        showToast('Your demo request has been submitted successfully!', 'success');
        setTimeout(function() { window.location.reload(); }, 500);
      } else {
        showToast(res.msg || 'Submission failed, please try again.', 'error');
      }
    })
    .catch(function(err) {
      console.error('Submit error:', err);
      showToast('Network error, please check your connection and try again.', 'error');
    })
    .finally(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit →';
    });
  });
})();
