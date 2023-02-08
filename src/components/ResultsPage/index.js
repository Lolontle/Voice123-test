import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";
import { Paginate } from "react-paginate-chakra-ui";
import Highlighter from "react-highlight-words";

const ResultsPage = () => {
  const { query, page } = useParams();
  const [pageNumber, setPageNumber] = React.useState(page);
  const { isLoading, data, error } = useQuery(["data"], () =>
    axios(
      `https://api.sandbox.voice123.com/providers/search/?service=voice_over&keywords=${query}&page=${pageNumber}`
    )
  );
  const handlePageClick = (p) => {
    setPageNumber(p);
  };

  console.log(data);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  // const findFirstParagraph = (query) => {
  //   data.data.providers.map((info) => {
  //     const paragraph = Object.values(info)
  //       .filter((value) => value.includes(query))
  //       .reduce((obj, keyValue) => {
  //         return Object.assign(obj, {
  //           [keyValue]: info[keyValue],
  //         });
  //       }, {});
  //       return paragraph
  //   });
  // };

  return (
    <Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Voice Actor Name</Th>
              <Th>Voice Actor Profile Picture</Th>
              <Th>Paragraph</Th>
              <Th>Audio Sample</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.providers.map((va) => (
              <Tr key={va.id}>
                <Td width={"100px"}>
                  <Link
                    href={`https://voice123.com/${va.user.username}`}
                    isExternal
                  >
                    {va.user.name}
                  </Link>
                </Td>
                <Td width={"100px"}>
                  {!va.user.picture_small ? (
                    <Text>Picture not available</Text>
                  ) : (
                    <Image src={va.user.picture_small} size={"xs"} />
                  )}
                </Td>
                <Td width={"100px"}>
                  <Highlighter
                    searchWords={[query]}
                    autoEscape={true}
                    textToHighlight={va.summary}
                  />
                </Td>
                <Td width={"100px"}>
                  {!va.relevant_sample.file ? (
                    <Text>Audio not available</Text>
                  ) : (
                    <ReactAudioPlayer src={va.relevant_sample.file} controls />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Paginate
          page={page}
          count={13}
          pageSize={10}
          onPageChange={handlePageClick}
          margin={2}
          shadow="lg"
          fontWeight="blue"
          variant="outline"
          w="full"
        />
      </TableContainer>
    </Flex>
  );
};

export default ResultsPage;
