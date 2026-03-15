const translations = {
    ar: {
        page_title: "تطبيق السيرة الذاتية الاحترافي",
        app_title: '<i class="fa-solid fa-file-signature"></i> صانع السيرة الذاتية',
        app_desc: "قم بتحديث بياناتك لتشاهد التغييرات فوراً!",
        lang_text: "EN",
        
        personal_info: '<i class="fa-solid fa-user"></i> المعلومات الشخصية',
        full_name: "الاسم الكامل",
        name_placeholder: "مثال: أحمد عبد الرحمن",
        job_title: "المسمى الوظيفي",
        title_placeholder: "مثال: مهندس برمجيات أول",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        address: "العنوان",
        address_placeholder: "المدينة، الدولة",
        summary_label: "نبذة شخصية",
        summary_placeholder: "اكتب نبذة مختصرة عنك...",
        summary_placeholder_text: "نبذة شخصية عنك تبرز أهم مهاراتك وخبراتك.",
        
        experience: '<i class="fa-solid fa-briefcase"></i> الخبرات العملية',
        add_experience: "إضافة خبرة جديدة",
        exp_placeholder: "أضف خبراتك العملية...",
        exp_title_pl: "المسمى الوظيفي",
        exp_company_pl: "جهة العمل",
        exp_date_pl: "الفترة الزمنية (مثال: 2020 - 2023)",
        exp_desc_pl: "أبرز الإنجازات والمهام...",
        
        education: '<i class="fa-solid fa-graduation-cap"></i> التعليم',
        add_education: "إضافة تعليم جديد",
        edu_placeholder: "أضف مؤهلاتك العلمية...",
        edu_degree_pl: "الدرجة العلمية",
        edu_school_pl: "المؤسسة التعليمية",
        edu_date_pl: "سنة التخرج (مثال: 2019)",
        
        skills: '<i class="fa-solid fa-star"></i> المهارات',
        skills_label: "ادخل مهاراتك مفصولة بفاصلة",
        skills_placeholder: "تطوير الويب، إدارة المشاريع...",
        skills_empty: "أضف مهاراتك...",
        
        print_btn: '<i class="fa-solid fa-print"></i> حفظ بصيغة PDF',

        email_val: "البريد الإلكتروني",
        phone_val: "رقم الهاتف",
        address_val: "العنوان"
    },
    en: {
        page_title: "Professional CV Builder",
        app_title: '<i class="fa-solid fa-file-signature"></i> CV Builder',
        app_desc: "Update your details to see changes instantly!",
        lang_text: "AR",
        
        personal_info: '<i class="fa-solid fa-user"></i> Personal Information',
        full_name: "Full Name",
        name_placeholder: "e.g., John Doe",
        job_title: "Job Title",
        title_placeholder: "e.g., Senior Software Engineer",
        email: "Email Address",
        phone: "Phone Number",
        address: "Address",
        address_placeholder: "City, Country",
        summary_label: "Professional Summary",
        summary_placeholder: "Write a brief summary about yourself...",
        summary_placeholder_text: "A personal summary highlighting your top skills and experiences.",
        
        experience: '<i class="fa-solid fa-briefcase"></i> Work Experience',
        add_experience: "Add Experience",
        exp_placeholder: "Add your work experiences...",
        exp_title_pl: "Job Title",
        exp_company_pl: "Company",
        exp_date_pl: "Period (e.g., 2020 - 2023)",
        exp_desc_pl: "Key achievements...",
        
        education: '<i class="fa-solid fa-graduation-cap"></i> Education',
        add_education: "Add Education",
        edu_placeholder: "Add your educational qualifications...",
        edu_degree_pl: "Degree",
        edu_school_pl: "Institution",
        edu_date_pl: "Graduation Year (e.g., 2019)",
        
        skills: '<i class="fa-solid fa-star"></i> Skills',
        skills_label: "Enter skills separated by a comma",
        skills_placeholder: "Web Development, Management...",
        skills_empty: "Add your skills...",
        
        print_btn: '<i class="fa-solid fa-print"></i> Save as PDF',

        email_val: "Email Address",
        phone_val: "Phone Number",
        address_val: "Address"
    }
};

let currentLang = 'ar';

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        updateLanguage();
    });

    const inputs = document.querySelectorAll('input[data-target], textarea[data-target]');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if(targetEl) {
                targetEl.textContent = e.target.value;
                if(e.target.value) {
                    targetEl.classList.remove('empty-text');
                } else {
                    targetEl.classList.add('empty-text');
                    targetEl.textContent = translations[currentLang][getPlaceholderKey(targetId)];
                }
            }
        });
    });

    // Add empty defaults
    addExperience();
    addEducation();
    updateLanguage();
});

function getPlaceholderKey(id) {
    const keys = {
        'cv-name': 'name_placeholder',
        'cv-title': 'title_placeholder',
        'cv-summary': 'summary_placeholder_text',
        'cv-email': 'email_val',
        'cv-phone': 'phone_val',
        'cv-address': 'address_val'
    };
    return keys[id] || '';
}

function updateLanguage() {
    const t = translations[currentLang];
    
    // innerHTML (for tags that include icons)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.setAttribute('placeholder', t[key]);
        }
    });

    // target elements that are empty
    document.querySelectorAll('input[data-target], textarea[data-target]').forEach(input => {
        if (!input.value) {
            const targetId = input.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl && targetEl.classList.contains('empty-text')) {
                targetEl.textContent = t[getPlaceholderKey(targetId)];
            }
        }
    });

    updatePreview();
    updateSkills(document.getElementById('skills').value);
}

function addExperience() {
    const container = document.getElementById('experience-container');
    const template = document.getElementById('exp-form-template');
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    updateLanguage(); 
    updatePreview();
}

function addEducation() {
    const container = document.getElementById('education-container');
    const template = document.getElementById('edu-form-template');
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    updateLanguage();
    updatePreview();
}

function updatePreview() {
    const t = translations[currentLang];

    // Experience
    const expForms = document.querySelectorAll('#experience-container .dynamic-item');
    const expList = document.getElementById('cv-experience-list');
    expList.innerHTML = '';
    
    if(expForms.length === 0) {
        expList.innerHTML = `<div class="placeholder-text">${t['exp_placeholder']}</div>`;
    } else {
        expForms.forEach(form => {
            let title = form.querySelector('.exp-title').value;
            let company = form.querySelector('.exp-company').value;
            let date = form.querySelector('.exp-date').value;
            let desc = form.querySelector('.exp-desc').value;

            const isTitleEmpty = !title;
            const isCompanyEmpty = !company;
            const isDateEmpty = !date;
            
            title = title || t['exp_title_pl'];
            company = company || t['exp_company_pl'];
            date = date || t['exp_date_pl'];

            const item = document.createElement('div');
            item.className = 'cv-item';
            
            let formattedDesc = desc ? desc.replace(/\n/g, '<br>') : t['exp_desc_pl'];
            
            item.innerHTML = `
                <div class="cv-item-header">
                    <h4 class="${isTitleEmpty ? 'empty-text' : ''}">${title}</h4>
                    <span class="cv-item-date ${isDateEmpty ? 'empty-text' : ''}">${date}</span>
                </div>
                <div class="cv-item-subtitle ${isCompanyEmpty ? 'empty-text' : ''}">${company}</div>
                <p class="cv-item-desc ${!desc ? 'empty-text' : ''}">${formattedDesc}</p>
            `;
            expList.appendChild(item);
        });
    }

    // Education
    const eduForms = document.querySelectorAll('#education-container .dynamic-item');
    const eduList = document.getElementById('cv-education-list');
    eduList.innerHTML = '';

    if(eduForms.length === 0) {
        eduList.innerHTML = `<div class="placeholder-text">${t['edu_placeholder']}</div>`;
    } else {
        eduForms.forEach(form => {
            let degree = form.querySelector('.edu-degree').value;
            let school = form.querySelector('.edu-school').value;
            let date = form.querySelector('.edu-date').value;

            const isDegreeEmpty = !degree;
            const isSchoolEmpty = !school;
            const isDateEmpty = !date;

            degree = degree || t['edu_degree_pl'];
            school = school || t['edu_school_pl'];
            date = date || t['edu_date_pl'];

            const item = document.createElement('div');
            item.className = 'cv-item';
            item.innerHTML = `
                <div class="cv-item-header">
                    <h4 class="${isDegreeEmpty ? 'empty-text' : ''}">${degree}</h4>
                    <span class="cv-item-date ${isDateEmpty ? 'empty-text' : ''}">${date}</span>
                </div>
                <div class="cv-item-subtitle ${isSchoolEmpty ? 'empty-text' : ''}">${school}</div>
            `;
            eduList.appendChild(item);
        });
    }
}

function updateSkills(skillsText) {
    const skillsList = document.getElementById('cv-skills-list');
    skillsList.innerHTML = '';
    const t = translations[currentLang];
    
    if(!skillsText) return;

    if(!skillsText.trim()) {
        skillsList.innerHTML = `<div class="placeholder-text">${t['skills_empty']}</div>`;
        return;
    }

    const skills = skillsText.split(/[,،]/).map(s => s.trim()).filter(s => s);
    if(skills.length === 0) {
        skillsList.innerHTML = `<div class="placeholder-text">${t['skills_empty']}</div>`;
        return;
    }
    
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'cv-skill-tag';
        span.textContent = skill;
        skillsList.appendChild(span);
    });
}
