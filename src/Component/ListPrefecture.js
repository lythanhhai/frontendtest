import React, { useEffect, useState } from "react";
import "../Assets/Container/Container.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedPrefCodeAction,
  getSelectedPrefNameAction,
} from "../Action/getSelectedPrefCodeAction";

const ListPrefecture = ({ listPrefecture, isLoading }) => {
  const [listPrefectureSelected, setListPrefectureSelected] = useState([]);
  const [listPrefectureSelectedName, setListPrefectureSelectedName] = useState(
    []
  );
  const dispatch = useDispatch();
  const HandleChoosePrefecture = (prefCode, prefName) => {
    var array = [...listPrefectureSelected];
    var codeSelected = prefCode;
    var new_array = [...listPrefectureSelected];
    var new_array_name = [...listPrefectureSelectedName];
    if (array.includes(codeSelected)) {
      var removeIndex = -1;
      new_array = array.filter((item, index) => {
        if (item === codeSelected) {
          removeIndex = index;
        }
        return item !== codeSelected;
      });
      new_array_name = new_array_name.filter((item, index) => {
        return index !== removeIndex;
      });
    } else {
      new_array.push(prefCode);
      new_array_name.push(prefName);
    }
    setListPrefectureSelected(new_array);
    setListPrefectureSelectedName(new_array_name);
    dispatch(getSelectedPrefCodeAction(new_array));
    dispatch(getSelectedPrefNameAction(new_array_name));
  };

  var elementCheckbox;
  if (listPrefecture.length < 1) {
    elementCheckbox = <></>;
  } else {
    elementCheckbox = listPrefecture.map((prefecture, index) => {
      const { prefCode, prefName } = prefecture;
      return (
        <div key={prefCode} className="list__prefecture-item">
          <input
            type="checkbox"
            value={prefName}
            disabled={isLoading ? true : false}
            onChange={() => {
              HandleChoosePrefecture(prefCode, prefName);
              //   console.log(new_array)
            }}
          />
          <p>{prefName}</p>
        </div>
      );
    });
  }

  return (
    <section className="list">
      <h3 className="list__title">Prefecture</h3>
      <form className="list__prefecture">{elementCheckbox}</form>
    </section>
  );
};

export default React.memo(ListPrefecture);
