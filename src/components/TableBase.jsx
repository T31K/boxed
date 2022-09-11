import IconBase from "./IconBase";
import { useEffect, useState } from "react";

export default function TableBase({
  title,
  resource,
  headers,
  limitPerPage,
  count,
  isLoading,
  nextUrl,
  nextPage,
  prevPage,
  minLoadingItems,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [renderedResource, setRenderedResource] = useState([]);
  const [iconBase, setIconBase] = useState("minus");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (resource) {
      setRenderedResource(resource);
    }
  }, [resource]);

  // fires on change, sets state and call filterResource()
  const handleSearchValue = ({ target }) => {
    if (target.value) {
      setSearchValue(target.value);
      filterResource();
    } else {
      setSearchValue("");
      setRenderedResource(resource);
    }
  };

  const filterResource = () => {
    let filtered = renderedResource.filter((obj) =>
      Object.keys(obj).some((key) =>
        obj[key].toString().toLowerCase().includes(searchValue)
      )
    );
    setRenderedResource(filtered);
  };

  // toggle icons and toggle sort to ascending/descending/none
  const sortResource = () => {
    switch (iconBase) {
      case "minus":
        setIconBase("arrow_up");
        setRenderedResource(
          [...renderedResource].sort((a, b) => {
            return b.name.localeCompare(a.name);
          })
        );
        break;
      case "arrow_up":
        setIconBase("arrow_down");
        setRenderedResource(
          [...renderedResource].sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
        );
        break;
      case "arrow_down":
        setIconBase("minus");
        setRenderedResource(resource);
        break;
      default:
        setIconBase("minus");
    }
  };

  const handleSelectedRows = ({ target }, index) => {
    if (target.checked && !selectedRows.includes(index)) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows([...selectedRows].filter((item) => item !== index));
    }
  };

  return (
    <div class="container">
      <h1>{title}</h1>
      <input
        id="tt"
        type="text"
        value={searchValue}
        onChange={handleSearchValue}
        placeholder="Search "
      />
      <table class="rwd-table">
        <tbody>
          <tr>
            {headers
              ? headers.map((obj, index) => {
                  return (
                    <td>
                      {obj.label}
                      {obj.sortable ? (
                        <span onClick={sortResource}>
                          <IconBase variant={iconBase} />
                        </span>
                      ) : null}
                    </td>
                  );
                })
              : null}
          </tr>

          {!isLoading
            ? renderedResource?.map((obj, index) => {
                return (
                  <tr>
                    {headers.map((nestedObj, nestedIndex) => {
                      return obj[nestedObj.name] ? (
                        <td>{obj[nestedObj.name]}</td>
                      ) : (
                        <td className="checkbox">
                          <input
                            type="checkbox"
                            onChange={(e, nestedIndex) =>
                              handleSelectedRows(e, index)
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : [...Array(minLoadingItems)].map((el, index) => {
                return (
                  <tr>
                    {headers.map((nestedEl) => {
                      return (
                        <td>
                          <span className="loading"></span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </table>
      <div class="controls">
        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
      <p>{selectedRows.length} selected</p>
      <p>
        Displaying {renderedResource.length} of {count} records
      </p>
    </div>
  );
}

// sort, cleanup, write docs, deploy
