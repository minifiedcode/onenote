import { inputNeeded } from "./templateFields";
import { useEffect, useInsertionEffect, useState } from "react";
import { defaultTrainings } from "./trainingTable";
import { useTemplateSession } from "../../hooks/useTemplateSession";
import "./Template.scss";

export default function CreateTrainingForm({
  updateTemplate,
  updateTrainingList,
}) {
  const [training, setTraining] = useState(defaultTrainings);
  const templates = useTemplateSession();

  useEffect(() => {
    if (templates.length <= 0) return;
    updateTemplate(templates[0]["template-title"]);
  }, [templates]);

  const getInputFields = (handleChange) => {
    return inputNeeded.map((field) => (
      <input
        key={field.id}
        className="template-input"
        type="text"
        placeholder={field.placeholder}
        name={field.name}
        onChange={handleChange}
        value={training[field.name]}
        required
      />
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrainingList(training);
    setTraining(defaultTrainings);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setTraining({
      ...training,
      [name]: value,
    });
  };

  const templateChange = (e) => {
    updateTemplate(e.target.value);
  };

  const renderTemplates = () => {
    return templates.map((template, index) => (
      <option key={index} value={template["template-title"]}>
        {template["template-title"]}
      </option>
    ));
  };

  return (
    <>
      {/* TRAINING CREATION FORM */}
      <form className="template-form" onSubmit={handleSubmit}>
        <select onChange={templateChange}>
          {/* GET ALL <option> FIELDS */}
          {renderTemplates()}
        </select>

        {/* GET ALL <input> FIELDS */}
        {getInputFields(handleChange)}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
