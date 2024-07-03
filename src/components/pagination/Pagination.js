import './pagination.css';

const Pagination = ({pages, currntPage, setCurrntPage}) => {

    const generatedPage = [];
    for(let i=1; i <= pages; i++) {
      generatedPage.push(i);
    }


  return (
    <div className='pagination'>

      <button
        className='page previous'
        onClick={() => setCurrntPage(prev => prev - 1)}
        disabled={currntPage === 1}
       >
        السابق
        </button>

        {generatedPage.map(page => (
            <div 
              onClick={() => setCurrntPage(page)} 
              key={page} 
              className={currntPage === page ? "page active" : "page"}>

                {page}

            </div>
        ))}

        <button
          className='page next'
          onClick={() => setCurrntPage(prev => prev + 1)}
          disabled={currntPage === pages}
        >
        التالي
        </button>

    </div>
  )
}

export default Pagination;
