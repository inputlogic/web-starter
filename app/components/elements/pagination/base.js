import {map} from 'wasmuth'
import {Link} from '/components/elements/link'

export const Pagination = ({hasNext, hasPrevious, pages, pageBuilder, activePage}) =>
  <nav class='pagination'>
    {hasPrevious
      ? <Link to={pageBuilder(activePage - 1)} >
        <img src='/images/icons/icon-back.svg' /> Back
      </Link>
      : <span className='disabled' >
        <img src='/images/icons/icon-back.svg' /> Back
      </span>
    }
    <ul>
      {map(
        (page, index) => page
          ? <li key={`page-${page}`}>
            <Link to={pageBuilder(page)} className={activePage === page ? 'active' : ''} >
              {page}
            </Link>
          </li>
          : <li key={`break-${index}`}>&hellip;</li>,
        pages
      )}
    </ul>
    {hasNext
      ? <Link to={pageBuilder(activePage + 1)} >
        Next <img src='/images/icons/icon-next.svg' />
      </Link>
      : <span className='disabled' >
        Next <img src='/images/icons/icon-next.svg' />
      </span>
    }
  </nav>

export default Pagination
