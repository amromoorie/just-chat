export default function Chat({}) {
  return (
    <>
      <main>
        <header></header>
        <section></section>
        <section>
          <form className='' onSubmit={handleSubmit}>
            <input
              type='text'
              value={currentUserInput}
              placeholder='write your username...'
              onChange={handleUserChange}
            />
            <input
              type='text'
              value={currentRoomInput}
              placeholder='enter room id'
              onChange={handleRoomChange}
            />
            <Button type='submit'>send</Button>
          </form>
        </section>
      </main>
    </>
  )
}
