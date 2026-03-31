
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '2px', padding:"4px", display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter Node' />
                <DraggableNode type='math' label='Math Node' />
                <DraggableNode type='delay' label='Delay Node' />
                <DraggableNode type='condition' label='Condition Node' />
                <DraggableNode type='logger' label='Logger Node' />
            </div>
        </div>
    );
};
