import { useState } from "react";

interface IFileMetadata {
    id: string;
    name: string;
    isFolder: boolean;
    items: IFileMetadata[]

}

interface IRootFolderProps {
    explorer: IFileMetadata
}

export const RootFolder = (props: IRootFolderProps) => {
    const { explorer } = props;
    const [newFolders, setNewFolders] = useState(explorer);

    const addFolder = (incomingId: string) => {
        if (newFolders.id == incomingId) {
            const newArray = [{ id: '99', name: 'test', isFolder: true, items: [] }, ...newFolders.items]
            setNewFolders({ ...explorer, items: newArray });
        }
    }

    return (
        <>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 500 }}>
                    {explorer.name}
                </div>
                {explorer.isFolder ? <button onClick={() => addFolder(explorer.id)}>+ folder</button> : null}
            </div>
            <div style={{ marginLeft: explorer.isFolder ? '15px' : 'unset' }}>
                {explorer.isFolder ? newFolders.items.map((item) => (
                    <RootFolder explorer={item} />
                )) : null}
            </div>
        </>
    )
}