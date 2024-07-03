import './abouteAddProject.css';

const AbouteAddProject = () => {
  return (
    <div className='abouteAddProject'>

      <div className='box-aboute'>
        <h6 className='title'>ابدأ بإنجاز مشروعك</h6>
        <p className='par'>
        تستطيع إنجاز مشروعك بالشكل الذي تريده من خلال بعيد 
        أدخل تفاصيل المشروع والميزانية والمدة المتوقعة ليتم مراجعته ونشره مجاناً
        ، بعد ذلك سيظهر للمستقلين في صفحة المشاريع ويقدموا 
        عروضهم عليه لتختار العرض الأنسب لك ويبدأ المستقل بتنفيذ المشروع.
        </p>
      </div>

      <div className='box-aboute'>
        <h6 className='title'>موقع بعيد يضمن حقوقك</h6>
        <p className='par'>
        يقوم موقع بعيد بدور الوسيط بينك وبين المستقل الذي 
        توظفه لتنفيذ مشروعك، فقط بعد انتهاء المستقل من
         تنفيذ المشروع كاملاً يتم تحويل المبلغ إلى حسابه.
        </p>
      </div>

      <ul className='box-aboute'>
        <h6 className='title'>نصائح للحصول على عمل ناجح</h6>
        <li>وضح جميع التفاصيل والمهام المطلوب إنجازها</li>
        <li>املأ جميع الحقول ووفّر أمثلة لما تريد تنفيذه</li>
        <li>جزّء المشروع والمهام الكبيرة على عدّة مراحل صغيرة</li>
      </ul>

    </div>
  )
}

export default AbouteAddProject;
