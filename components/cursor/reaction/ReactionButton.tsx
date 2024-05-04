import React from "react";

type Props = {
  setReaction: (reaction: string) => void;
};

const ReactionSelector = ({ setReaction }: Props) => (
  <div
    className='absolute bottom-20 left-0 right-0 mx-auto w-fit transform rounded-full bg-white/20  px-2'
    // className="isolate absolute bottom-20 left-0 right-0 mx-auto w-fit transform rounded-full aspect-video bg-white/20 shadow-lg ring-1 ring-black/5"
    onPointerMove={(e) => e.stopPropagation()}
  >
    <ReactionButton reaction='👍' onSelect={setReaction} />
    <ReactionButton reaction='🔥' onSelect={setReaction} />
    <ReactionButton reaction='😍' onSelect={setReaction} />
    <ReactionButton reaction='👀' onSelect={setReaction} />
    <ReactionButton reaction='😱' onSelect={setReaction} />
    <ReactionButton reaction='🙁' onSelect={setReaction} />
  </div>
);

type ReactionButtonProps = {
  reaction: string;
  onSelect: (reaction: string) => void;
};

const ReactionButton = ({ reaction, onSelect }: ReactionButtonProps) => (
  <button
    className='transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none'
    onPointerDown={() => onSelect(reaction)}
  >
    {reaction}
  </button>
);

export default ReactionSelector;