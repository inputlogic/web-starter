import {map} from 'wasmuth'
import {Link} from '/components/elements/link'

export const Pagination = ({hasNext, hasPrevious, pages, pageBuilder, activePage}) =>
  <nav class='pagination'>
    {hasPrevious
      ? <Link to={pageBuilder(activePage - 1)} >
        <span className='arrow back' /> Back
      </Link>
      : <span className='disabled' >
        <span className='arrow back' /> Back
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
        Next <span className='arrow next' />
      </Link>
      : <span className='disabled' >
        Next <span className='arrow next' />
      </span>
    }
  </nav>

export default Pagination
