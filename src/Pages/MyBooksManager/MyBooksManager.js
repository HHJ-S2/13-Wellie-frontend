import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { TOKEN, LIBRARY } from "../../config";

function MyBooksManager() {
  const history = useHistory();
  const [bookList, setBookList] = useState([]);
  const [bookShelfList, setBookShelfList] = useState([]);
  const [bookShelfInput, setbookShelfInput] = useState("");
  const [checkBookList, setCheckBookList] = useState([]);
  const [updateItems, setUpdateItems] = useState([]);

  useEffect(() => {
    stateCheck();
  }, []);

  const stateCheck = async () => {
    !history.location.state
      ? await axios
          .get(`${LIBRARY}/mybook`, {
            headers: {
              Authorization: TOKEN,
            },
          })
          .then((res) => {
            setBookList(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          })
      : await axios
          .get(`${LIBRARY}/shelfdetail?shelf_id=${history.location.state.id}`, {
            headers: {
              Authorization: TOKEN,
            },
          })
          .then((res) => {
            setBookShelfList(res.data.bookShelfCase);
          })
          .catch((err) => {
            console.log(err.response);
          });
  };

  const handleChangeBookShelfNameInput = (e) => {
    const { value } = e.target;

    setbookShelfInput(value);
  };

  const handleChangeSingleCheck = (e, id) => {
    const { checked } = e.target;

    if (checked) {
      setCheckBookList([...checkBookList, id]);
    } else {
      setCheckBookList(checkBookList.filter((el) => el !== id));
    }
  };

  const handleChangeAllCheck = (e) => {
    const { checked } = e.target;

    if (!history.location.state) {
      if (checked) {
        const allArray = [];
        bookList.books.forEach((item) => allArray.push(item.id));

        setCheckBookList(allArray);
      } else {
        setCheckBookList([]);
      }
    } else {
      if (checked) {
        const allArray = [];
        bookShelfList.forEach((item) => allArray.push(item.id));

        setCheckBookList(allArray);
      } else {
        setCheckBookList([]);
      }
    }
  };

  const handleClickBookShelfAdd = () => {
    if (!bookShelfInput.length) {
      alert("책장 이름을 입력해주세요.");
    } else if (!checkBookList.length) {
      alert("도서를 선택해주세요.");
    } else {
      axios
        .post(
          `${LIBRARY}/shelfdetail`,
          {
            booklist: checkBookList,
            shelfname: bookShelfInput,
          },
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        )
        .then((res) => {
          alert("책장이 추가되었습니다.");
          history.push("/my_books");
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleClickBookShelfUpdate = () => {
    for (let i = 0; i < bookShelfList.length; i++) {
      updateItems.push(bookShelfList[i].id);
    }

    if (!bookShelfInput) {
      alert("서재명을 입력해주세요");
    } else {
      axios
        .patch(
          `${LIBRARY}/shelfdetail`,
          {
            shelf_id: history.location.state.id,
            booklist: updateItems,
            shelfname: bookShelfInput,
          },
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        )
        .then((res) => {
          alert("책장이 수정되었습니다.");
          history.push("/my_books");
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleClickBookShelfDelete = () => {
    const newArray = [...bookShelfList];
    const filterItem = newArray.filter(
      (item) => checkBookList.indexOf(item.id) === -1
    );
    setBookShelfList(filterItem);
  };

  return (
    <ManagerWrapper>
      {!history.location.state ? (
        <ManagerHeader>새로운 책장</ManagerHeader>
      ) : (
        <ManagerHeader>책장 수정</ManagerHeader>
      )}
      <Container>
        <TopBanner>
          <InputWrap>
            {!history.location.state ? (
              <BookShelfNameInput
                type="text"
                placeholder="책장 이름을 입력해주세요."
                onChange={handleChangeBookShelfNameInput}
              />
            ) : (
              <BookShelfNameInput
                type="text"
                value={bookShelfInput}
                placeholder="책장 이름을 입력해주세요."
                onChange={handleChangeBookShelfNameInput}
              />
            )}
          </InputWrap>
        </TopBanner>
      </Container>
      <Container>
        <SelectWrap>
          <FilterInput
            id="all"
            type="checkbox"
            name="allSelect"
            onChange={(e) => handleChangeAllCheck(e)}
          />
          <CheckIcon />
          <FilterLabel htmlFor="all">전체선택</FilterLabel>
        </SelectWrap>
      </Container>
      <Container>
        <ListWrap>
          {!history.location.state
            ? bookList.books &&
              bookList.books.map((item) => (
                <List key={item.id}>
                  <SelectInput
                    id={item.id}
                    type={"checkbox"}
                    checked={checkBookList.includes(item.id) ? true : false}
                    onChange={(e) => {
                      handleChangeSingleCheck(e, item.id);
                    }}
                  />
                  <SelectLabel htmlFor={item.id}></SelectLabel>
                  <ImgWrap>
                    <img src={item.bookCoverImg} alt="도서 책커버" />
                  </ImgWrap>
                  <BookInfo>
                    <h5>{item.bookName}</h5>
                    <p>
                      {item.writer.map((item, idx) => (
                        <span key={idx}>{item}</span>
                      ))}
                    </p>
                  </BookInfo>
                </List>
              ))
            : bookShelfList &&
              bookShelfList.map((item) => (
                <List key={item.id}>
                  <SelectInput
                    id={item.id}
                    type={"checkbox"}
                    checked={checkBookList.includes(item.id) ? true : false}
                    onChange={(e) => {
                      handleChangeSingleCheck(e, item.id);
                    }}
                  />
                  <SelectLabel htmlFor={item.id}></SelectLabel>
                  <ImgWrap>
                    <img src={item.bookCoverImg} alt="도서 책커버" />
                  </ImgWrap>
                  <BookInfo>
                    <h5>{item.bookName}</h5>
                    <p>
                      {item.writer.map((item, idx) => (
                        <span key={idx}>{item}</span>
                      ))}
                    </p>
                  </BookInfo>
                </List>
              ))}
        </ListWrap>
        <AddBtnWrap>
          {!history.location.state ? (
            <BookShelfAddBtn onClick={() => handleClickBookShelfAdd()}>
              책장 만들기
            </BookShelfAddBtn>
          ) : (
            <BookShelfAddBtnWrap>
              <BookShelfAddBtn
                color="gray"
                onClick={() => handleClickBookShelfDelete()}
              >
                삭제
              </BookShelfAddBtn>
              <BookShelfAddBtn onClick={() => handleClickBookShelfUpdate()}>
                저장
              </BookShelfAddBtn>
            </BookShelfAddBtnWrap>
          )}
        </AddBtnWrap>
      </Container>
    </ManagerWrapper>
  );
}

export default MyBooksManager;

const ManagerWrapper = styled.div`
  min-height: 100vh;
  background: #eee;
`;

const ManagerHeader = styled.header`
  position: fixed;
  top: 65px;
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  z-index: 2;
`;

const TopBanner = styled.div`
  position: fixed;
  top: 102px;
  width: 700px;
  background: rgb(134, 134, 134);
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  width: 700px;
  margin: 0 auto;
`;

const InputWrap = styled.div`
  min-height: 150px;
`;

const BookShelfNameInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 12px;
  background: none;
  border-bottom: 1px solid rgb(155, 155, 155);
  font-size: 20px;
  color: rgba(255, 255, 255, 0.75);

  &::placeholder {
    color: rgba(255, 255, 255, 0.75);
  }
`;

const BookShelfAddBtnWrap = styled.div`
  display: flex;
  width: 100%;
`;

const ListWrap = styled.ul`
  min-height: calc(100vh - 310px);
  padding: 0 0 50px;
  background: #fff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
`;

const List = styled.li`
  position: relative;
  display: table;
  background: #fff;
  padding: 25px;
  border-bottom: 1px dashed #ddd;

  &:hover {
    background: rgb(250 250 250);
  }

  &:last-child {
    border-bottom: none;
  }

  img {
    max-width: 65px;
    border: 1px solid rgb(232 232 232);
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.125);
  }
`;

const ImgWrap = styled.div`
  display: table-cell;
`;

const BookInfo = styled.div`
  display: table-cell;
  width: 100%;
  padding: 20px;
  vertical-align: middle;

  h5 {
    margin-bottom: 8px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: rgb(121, 121, 121);
  }
`;

const AddBtnWrap = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 700px;
  height: 50px;
`;

const BookShelfAddBtn = styled.button`
  width: 100%;
  background: ${({ color }) =>
    color === "gray" ? "rgb(229 229 229)" : "#9268bb"};
  font-size: 16px;
  font-weight: 600;
  transition: 0.35s ease;
  cursor: pointer;
  color: #fff;
`;

const SelectInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.125);
  }

  &:checked + label {
    background: rgba(164, 81, 247, 0.3);
  }

  &:checked + label + div > img {
    border: 1px solid rgb(164, 81, 247);
  }
`;

const SelectLabel = styled.label`
  background: rgba(164, 81, 247, 0);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
`;

const CheckIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background-image: url(/images/MyBooks/spl_input.png);
  background-repeat: no-repeat;
  background-size: 100px 100px;
  background-position: -25px 0;
`;

const SelectWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 260px 15px 5px;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  line-height: 24px;
  vertical-align: top;
  color: #999;
`;

const FilterInput = styled.input`
  margin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:checked + span {
    background-position: -25px -25px;
  }

  &:checked + span + label {
    font-weight: 600;
  }
`;
