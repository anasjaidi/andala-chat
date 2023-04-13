import { useState } from "react";
import { createStore } from "redux";
import { IconPlus } from '@tabler/icons-react'

export function SideBar(props) {
  const initialState = {
    conversationId: 0,
  };

  const [selectedId, setSelectedId] = useState(0);

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_CONVERSATION_ID":
        return {
          ...state,
          conversationId: action.payload,
        };
      default:
        return state;
    }
  };

  const store = createStore(reducer);

  return (
    <div className="absolute w-full h-full bg-black/20 z-[99]">
      <div className="absolute z-50 flex items-center justify-start space-y-4 flex-col bg-white w-1/2 md:h-[78.2%] h-[78%] rounded-br-lg rounded-tr-lg">
        <ul
          className="px-2 py-2 space-y-4 overflow-auto scrollbar-thin scrollbar-thumb-[#dbf64d] scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          role="none"
        >
          {props.conversationList.map((item) => (
            <li key={item.conversationId}>
              <button
                onClick={() => {
                  setSelectedId(item.conversationId);
                  store.dispatch({
                    type: "SET_CONVERSATION_ID",
                    payload: item.conversationId,
                  });
                }}
                href="#"
                className="w-full border-2 border-[#dbf64d] rounded-lg block px-7 py-1.5 text-xs text-gray-800 hover:bg-[#dbf64d]/5 "
                role="menuitem"
              >
                {item.conversationName}
              </button>
            </li>
          ))}
		  <div className="w-full h-10 flex items-center justify-center">
              <button
                onClick={() => {
                }}
                href="#_"
                className="flex items-center justify-center w-[30px] h-[30px] font-normal bg-[#dbf64d] hover:bg-[#dbf64d]/80 text-gray-800 rounded-full "
              >
                <IconPlus size={18} />
              </button>
            </div>
        </ul>
      </div>
    </div>
  );
}