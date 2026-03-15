document.addEventListener('DOMContentLoaded', () => {
    // التحديث المباشر للحقول النصية البسيطة
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
                    targetEl.textContent = getPlaceholderText(targetId);
                }
            }
        });
    });

    // إضافة عناصر افتراضية فارغة للبدء لتسهيل فهم الواجهة
    addExperience();
    addEducation();
});

function getPlaceholderText(id) {
    const placeholders = {
        'cv-name': 'الاسم الكامل',
        'cv-title': 'المسمى الوظيفي',
        'cv-summary': 'نبذة شخصية عنك تبرز أهم مهاراتك وخبراتك المهنية والهدف الذي تسعى لتحقيقه.',
        'cv-email': 'البريد الإلكتروني',
        'cv-phone': 'رقم الهاتف',
        'cv-address': 'العنوان'
    };
    return placeholders[id] || '';
}

function addExperience() {
    const container = document.getElementById('experience-container');
    const template = document.getElementById('exp-form-template');
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    updatePreview();
}

function addEducation() {
    const container = document.getElementById('education-container');
    const template = document.getElementById('edu-form-template');
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    updatePreview();
}

function updatePreview() {
    // تحديث قسم الخبرات العملية
    const expForms = document.querySelectorAll('#experience-container .dynamic-item');
    const expList = document.getElementById('cv-experience-list');
    expList.innerHTML = '';
    
    if(expForms.length === 0) {
        expList.innerHTML = '<div class="placeholder-text">أضف خبراتك العملية من القائمة الجانبية...</div>';
    } else {
        expForms.forEach(form => {
            let title = form.querySelector('.exp-title').value;
            let company = form.querySelector('.exp-company').value;
            let date = form.querySelector('.exp-date').value;
            let desc = form.querySelector('.exp-desc').value;

            const isTitleEmpty = !title;
            const isCompanyEmpty = !company;
            const isDateEmpty = !date;
            
            title = title || 'المسمى الوظيفي';
            company = company || 'جهة العمل';
            date = date || 'الفترة الزمنية';

            const item = document.createElement('div');
            item.className = 'cv-item';
            
            let formattedDesc = desc ? desc.replace(/\n/g, '<br>') : 'أبرز المهام والإنجازات التي قمت بها في هذا الدور...';
            
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

    // تحديث قسم التعليم
    const eduForms = document.querySelectorAll('#education-container .dynamic-item');
    const eduList = document.getElementById('cv-education-list');
    eduList.innerHTML = '';

    if(eduForms.length === 0) {
        eduList.innerHTML = '<div class="placeholder-text">أضف مؤهلاتك العلمية من القائمة الجانبية...</div>';
    } else {
        eduForms.forEach(form => {
            let degree = form.querySelector('.edu-degree').value;
            let school = form.querySelector('.edu-school').value;
            let date = form.querySelector('.edu-date').value;

            const isDegreeEmpty = !degree;
            const isSchoolEmpty = !school;
            const isDateEmpty = !date;

            degree = degree || 'الدرجة العلمية المكتسبة';
            school = school || 'المؤسسة التعليمية';
            date = date || 'سنة التخرج';

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

// دالة لتحديث المهارات
// تستقبل نصاً وتفصله بفاصلة إنجليزية (,) أو عربية (،)
function updateSkills(skillsText) {
    const skillsList = document.getElementById('cv-skills-list');
    skillsList.innerHTML = '';
    
    if(!skillsText.trim()) {
        skillsList.innerHTML = '<div class="placeholder-text">أضف مهاراتك...</div>';
        return;
    }

    const skills = skillsText.split(/[,،]/).map(s => s.trim()).filter(s => s);
    if(skills.length === 0) {
        skillsList.innerHTML = '<div class="placeholder-text">أضف مهاراتك...</div>';
        return;
    }
    
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'cv-skill-tag';
        span.textContent = skill;
        skillsList.appendChild(span);
    });
}
