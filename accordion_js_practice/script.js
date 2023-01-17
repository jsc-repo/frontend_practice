const toggleAccordion = (accordion) => {
  const content = accordion.nextElementSibling;

  console.log(content);
  if (content.dataset.isExpanded === "true") {
    content.style.maxHeight = "0px";
    content.dataset.isExpanded = "false";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    content.dataset.isExpanded = "true";
  }
};
