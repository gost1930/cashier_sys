import ExportImportButton from "./ExportImportButton";
const Section = ({ title, buttons }) => (
    <div className="space-y-4">
      <h2 className="text-center text-lg font-semibold">{title}</h2>
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        {buttons.map((label, idx) => (
          <ExportImportButton key={idx} label={label} />
        ))}
      </div>
    </div>
  );

  export default Section