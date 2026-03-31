import { useStore } from "./store";


export const DraggableNode = ({ type, label }) => {
  const mode = useStore((state) => state.mode);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        padding: "10px",
        maxWidth: '150px',
        minHeight: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        backgroundColor: mode === 'dark' ? '' : '#ffffff',
        borderColor: mode === 'dark' ? '#404040' : '#e0d7d7',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'all 0.2s ease-in-out',
        boxShadow: mode === 'dark'
          ? '0 1px 3px rgba(0, 0, 0, 0.3)'
          : '0 1px 3px rgba(0, 0, 0, 0.1)',
        outline: 'none',
        userSelect: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}

      draggable
    >
      <span style={{
        color: mode === 'dark' ? '#ebeff3' : '#1a1a1a',
      }}>{label}</span>
    </div>
  );
};
