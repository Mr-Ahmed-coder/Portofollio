const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const isOptionalString = (value) => value === undefined || value === null || typeof value === "string";
const isBoolean = (value) => typeof value === "boolean";
const isNumberLike = (value) =>
  typeof value === "number" || (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value)));

const sendValidationError = (res, message) => res.status(400).json({ message });

const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
};

const parseNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return value;
};

const normalizeTechStack = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return value;
};

const normalizeProjectPayload = (req, res, next) => {
  req.body = {
    ...req.body,
    techStack: normalizeTechStack(req.body.techStack),
    featured: parseBoolean(req.body.featured),
    order: parseNumber(req.body.order),
  };

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return sendValidationError(res, "Email and password are required.");
  }

  next();
};

const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (![name, email, subject, message].every(isNonEmptyString)) {
    return sendValidationError(res, "Name, email, subject, and message are required.");
  }

  next();
};

const validateProjectCreate = (req, res, next) => {
  const { title, description, techStack, longDescription, image, liveUrl, githubUrl, featured, order } = req.body;

  if (!isNonEmptyString(title) || !isNonEmptyString(description)) {
    return sendValidationError(res, "Project title and description are required.");
  }

  if (!Array.isArray(techStack) || techStack.length === 0 || !techStack.every(isNonEmptyString)) {
    return sendValidationError(res, "Tech stack must be a non-empty array of strings.");
  }

  if (!isNonEmptyString(image)) {
    return sendValidationError(res, "Project image URL is required.");
  }

  if (
    ![longDescription, liveUrl, githubUrl].every(isOptionalString) ||
    (featured !== undefined && !isBoolean(featured)) ||
    (order !== undefined && !isNumberLike(order))
  ) {
    return sendValidationError(res, "Project payload contains invalid field types.");
  }

  next();
};

const validateProjectUpdate = (req, res, next) => {
  const { title, description, techStack, longDescription, image, liveUrl, githubUrl, featured, order } = req.body;

  if (title !== undefined && !isNonEmptyString(title)) {
    return sendValidationError(res, "Project title must be a non-empty string.");
  }

  if (description !== undefined && !isNonEmptyString(description)) {
    return sendValidationError(res, "Project description must be a non-empty string.");
  }

  if (
    techStack !== undefined &&
    (!Array.isArray(techStack) || techStack.length === 0 || !techStack.every(isNonEmptyString))
  ) {
    return sendValidationError(res, "Tech stack must be a non-empty array of strings.");
  }

  if (image !== undefined && !isNonEmptyString(image)) {
    return sendValidationError(res, "Project image URL must be a non-empty string.");
  }

  if (
    ![longDescription, liveUrl, githubUrl].every(isOptionalString) ||
    (featured !== undefined && !isBoolean(featured)) ||
    (order !== undefined && !isNumberLike(order))
  ) {
    return sendValidationError(res, "Project payload contains invalid field types.");
  }

  next();
};

const validateSkillCreate = (req, res, next) => {
  const { name, category, proficiency, iconUrl, order } = req.body;

  if (!isNonEmptyString(name) || !isNonEmptyString(category)) {
    return sendValidationError(res, "Skill name and category are required.");
  }

  if (
    (proficiency !== undefined && !isNumberLike(proficiency)) ||
    !isOptionalString(iconUrl) ||
    (order !== undefined && !isNumberLike(order))
  ) {
    return sendValidationError(res, "Skill payload contains invalid field types.");
  }

  next();
};

const validateSkillUpdate = (req, res, next) => {
  const { name, category, proficiency, iconUrl, order } = req.body;

  if (
    (name !== undefined && !isNonEmptyString(name)) ||
    (category !== undefined && !isNonEmptyString(category)) ||
    (proficiency !== undefined && !isNumberLike(proficiency)) ||
    !isOptionalString(iconUrl) ||
    (order !== undefined && !isNumberLike(order))
  ) {
    return sendValidationError(res, "Skill payload contains invalid field types.");
  }

  next();
};

module.exports = {
  normalizeProjectPayload,
  validateLogin,
  validateContact,
  validateProjectCreate,
  validateProjectUpdate,
  validateSkillCreate,
  validateSkillUpdate,
};
