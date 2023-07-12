import React from 'react'

function Pagination(props) {
  let { pageNum, onNext, onPrev } = props;

  return (
    <div className="flex justify-center mb-7 ">
        <button className="border-2 
        p-1.5
        border-r-0
        rounded-l-xl
        font-bold
        border-amber-400
        hover:bg-amber-400
        "
        onClick={onPrev}
        >Previous</button>
        <button className="border-amber-400
        p-1.5
        border-r-0
        font-bold
        bg-amber-400
        ">{pageNum}
        </button>
        <button className="border-2
        p-1.5
        rounded-r-xl
        font-bold
        border-amber-400
        hover:bg-amber-400
        "
        onClick={onNext}
        >Next</button>
    </div>
  )
}

export default Pagination