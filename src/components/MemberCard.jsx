function MemberCard({ member, onClick, onKeyDown }) {
  return (
    <div
      className="member-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="member-image-wrapper">
        <img
          src={`/images/members/${member.id}.jpg`}
          alt={member.name}
          className="member-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=' + member.name
          }}
        />
      </div>
      <h3>{member.name}</h3>
      <p className="member-role">Click to view portfolio</p>
    </div>
  )
}

export default MemberCard
