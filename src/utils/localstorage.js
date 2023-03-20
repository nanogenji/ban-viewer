export default function tools () {
  const signSetItem = localStorage.setItem;
  localStorage.setItem = function (key, val) {
    const setEvent = new Event('setItemEvent');
    setEvent.key = key;
    setEvent.value = val;
    window.dispatchEvent(setEvent);
    signSetItem.apply(this, arguments);
  };
}