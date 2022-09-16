import { useState, useCallback } from "react";
import {
	Flex,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	FormControl,
	InputRightElement,
	useToast,
} from "@chakra-ui/react";
import {
	FaUserAlt,
	FaLock,
	FaRegEye,
	FaRegEyeSlash,
	FaComments,
} from "react-icons/fa";
import { AtSignIcon } from "@chakra-ui/icons";
import NavBar from "../user-service/NavBar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { createUserAccount } from "../../controller/user-controller";
import UserContext from "../../UserContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEye = chakra(FaRegEye);
const CFaEyeSlash = chakra(FaRegEyeSlash);

const SignupPage = () => {
	const { storeUserData } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const handleShowClick = () => setShowPassword(!showPassword);
	const navigate = useNavigate();

	const handleBackClick = useCallback(
		() => navigate("/login", { replace: true }),
		[navigate]
	);

	const signupSuccessToast = useToast();
	const showSignupSuccessToast = () =>
		signupSuccessToast({
			title: "Sign up successful!",
			description: "Let's gooooo.",
			status: "success",
			duration: 3000,
			isClosable: true,
		});

	const signupFailureToast = useToast();
	const showSignupFailureToast = () =>
		signupFailureToast({
			title: "Sign up unsuccessful.",
			description: "Something went wrong.",
			status: "error",
			duration: 3000,
			isClosable: true,
		});

	return (
		<Flex
			flexDirection="column"
			width="100wh"
			justifyContent="center"
			alignItems="center"
		>
			<NavBar />
			<Stack
				flexDir="column"
				mb="2"
				justifyContent="center"
				alignItems="center"
			>
				<FaComments color="#66ddaa" size="80" />
				<Box minW={{ base: "90%", md: "468px" }}>
					<form>
						<Stack
							spacing={4}
							p="1rem"
							backgroundColor="whiteAlpha.100"
							boxShadow="lg"
							borderRadius="lg"
						>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										children={<CFaUserAlt color="gray.500" />}
									/>
									<Input type="text" placeholder="Full name" />
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										children={<AtSignIcon color="gray.500" />}
									/>
									<Input
										onChange={(e) => setEmail(e.target.value)}
										type="email"
										placeholder="Email address"
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										color="gray.500"
										children={<CFaLock color="gray.500" />}
									/>
									<Input
										onChange={(e) => setPassword(e.target.value)}
										type={showPassword ? "text" : "password"}
										placeholder="Enter a password"
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleShowClick}
											variant="link"
											leftIcon={showPassword ? <CFaEye /> : <CFaEyeSlash />}
										/>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										color="gray.500"
										children={<CFaLock color="gray.500" />}
									/>
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="Re-enter password"
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleShowClick}
											variant="link"
											leftIcon={showPassword ? <CFaEye /> : <CFaEyeSlash />}
										/>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack direction="row">
								<Button
									borderRadius={5}
									variant="solid"
									width="50%"
									shadow="lg"
									onClick={handleBackClick}
								>
									Back
								</Button>
								<Button
									borderRadius={5}
									variant="solid"
									colorScheme="teal"
									width="50%"
									shadow="lg"
									onClick={() => {
										const promise = createUserAccount(email, password);
										promise.then((res) => {
											if (res) {
												storeUserData(res.data.accessToken, res.data.refreshToken, res.data.user);
												showSignupSuccessToast();
												navigate("/matchselection");
											} else {
												showSignupFailureToast();
											}
										});
									}}
								>
									Register
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default SignupPage;
