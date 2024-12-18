smplfitter.pt.bodyconverter.BodyFitter
======================================

.. py:class:: smplfitter.pt.bodyconverter.BodyFitter(body_model, num_betas = 10, enable_kid = False, vertex_subset = None, joint_regressor = None)

   Bases: :py:obj:`torch.nn.Module`


   Fits body model (SMPL/SMPL-X/SMPL+H) parameters to lists of target vertices and joints.

   :param body_model: The body model instance we wish to fit, of a certain SMPL model variant and             gender.
   :param num_betas: Number of shape parameters (betas) to use when fitting.
   :param enable_kid: Enables the use of a kid blendshape, allowing for fitting kid shapes as in
                      AGORA :footcite:`patel2021agora`.
   :param vertex_subset: A tensor or list specifying a subset of vertices to use in the fitting
                         process, allowing faster partial fitting. The subset of vertices should cover all body
                         parts to provide enough constraints.
   :param joint_regressor: A regression matrix of shape (num_joints, num_vertices) for obtaining
                           joint locations, in case the target joints are not specified when fitting. A custom one
                           must be supplied if `vertex_subset` is partial and target joint locations will not be
                           provided.


   .. py:method:: fit(target_vertices, target_joints = None, vertex_weights = None, joint_weights = None, num_iter = 1, beta_regularizer = 1, beta_regularizer2 = 0, scale_regularizer = 0, kid_regularizer = None, share_beta = False, final_adjust_rots = True, scale_target = False, scale_fit = False, initial_pose_rotvecs = None, initial_shape_betas = None, initial_kid_factor = None, requested_keys = None)

      Fits the body model to target vertices and optionally joints by optimizing for shape and
      pose, and optionally others.

      :param target_vertices: Target mesh vertices, shaped as (batch_size, num_vertices, 3).
      :param target_joints: Target joint locations, shaped as (batch_size, num_joints, 3).
      :param vertex_weights: Importance weights for each vertex during the fitting process.
      :param joint_weights: Importance weights for each joint during the fitting process.
      :param num_iter: Number of iterations for the optimization process. Reasonable values are in
                       the range of 1-4.
      :param beta_regularizer: L2 regularization weight for shape parameters (betas).
                               Set small for easy poses and extreme body shapes, set high for harder poses and
                               non-extreme body shape. (Good choices can be 0, 0.1, 1, 10.)
      :param beta_regularizer2: Secondary regularization for betas, affecting the first two
                                parameters. Often zero works well.
      :param scale_regularizer: Regularization term to penalize the scale factor deviating from 1.
                                Has no effect unless `scale_target` or `scale_fit` is True.
      :param kid_regularizer: Regularization weight for the kid blendshape factor. Has no effect
                              unless `enable_kid` on the object is True.
      :param share_beta: If True, shares the shape parameters (betas) across instances in the
                         batch.
      :param final_adjust_rots: Whether to perform a final refinement of the body part
                                orientations to improve alignment.
      :param scale_target: If True, estimates a scale factor to apply to the target vertices for
                           alignment.
      :param scale_fit: If True, estimates a scale factor to apply to the fitted mesh for
                        alignment.
      :param initial_pose_rotvecs: Optional initial pose rotations, if a good guess is available.
                                   Usually not necessary (experimental).
      :param initial_shape_betas: Optional initial shape parameters (betas), if a good guess is
                                  available. Usually not necessary (experimental).
      :param initial_kid_factor: Same as above, but for the kid blendshape factor.
      :param requested_keys: List of keys specifying which results to return.

      :returns:

                Dictionary
                    - **pose_rotvecs** -- Estimated pose in concatenated rotation vector format.
                    - **shape_betas** -- Estimated shape parameters (betas).
                    - **trans** -- Estimated translation parameters.
                    - **joints** -- Estimated joint positions, if requested.
                    - **vertices** -- Fitted mesh vertices, if requested.
                    - **orientations** -- Global body part orientations as rotation matrices.
                    - **relative_orientations** -- Parent-relative body part orientations as rotation                     matrices.
                    - **kid_factor** -- Estimated kid blendshape factor, if `enable_kid` is True.
                    - **scale_corr** -- Estimated scale correction factor, if `scale_target` or                     `scale_fit` is True.



   .. py:method:: fit_with_known_pose(pose_rotvecs, target_vertices, target_joints = None, vertex_weights = None, joint_weights = None, beta_regularizer = 1, beta_regularizer2 = 0, scale_regularizer = 0, kid_regularizer = None, share_beta = False, scale_target = False, scale_fit = False, beta_regularizer_reference = None, kid_regularizer_reference = None, requested_keys = None)

      Fits the body shape and translation (and possibly scale), with known output pose.

      :param pose_rotvecs: The known output joint rotations represented as rotation vectors,
                           shaped as (batch_size, num_joints * 3).
      :param target_vertices: Target mesh vertices to fit, shaped as (batch_size, num_vertices, 3).
      :param target_joints: Optional target joint positions, shaped as (batch_size, num_joints, 3).
      :param vertex_weights: Optional importance weights for individual vertices during the
                             fitting process.
      :param joint_weights: Optional importance weights for individual joints during the fitting
                            process.
      :param beta_regularizer: L2 regularization weight for shape parameters (betas).
      :param beta_regularizer2: Secondary regularization applied to the first two shape parameters.
      :param scale_regularizer: Regularization term penalizing deviation of the scale factor from 1.
      :param kid_regularizer: Regularization weight for the kid blendshape factor.
      :param share_beta: Whether to share the shape parameters (betas) across instances in the batch.
      :param scale_target: Whether to estimate a scale factor for the target vertices to aid
                           alignment.
      :param scale_fit: Whether to estimate a scale factor for the fitted mesh to aid alignment.
      :param beta_regularizer_reference: Optional reference values for beta regularization.
      :param kid_regularizer_reference: Optional reference values for kid factor regularization.
      :param requested_keys: List of result keys to return.

      :returns:

                Dictionary
                    - **shape_betas** -- Estimated shape parameters (betas).
                    - **trans** -- Estimated translation parameters.
                    - **joints** -- Estimated joint positions.
                    - **vertices** -- Fitted mesh vertices.
                    - **orientations** -- Global body part orientations as rotation matrices.
                    - **relative_orientations** -- Parent-relative body part orientations as rotation                     matrices.
                    - **kid_factor** -- Estimated kid blendshape factor, if enabled.
                    - **scale_corr** -- Estimated scale correction factor, if scaling is enabled.



   .. py:method:: fit_with_known_shape(shape_betas, target_vertices, target_joints = None, vertex_weights = None, joint_weights = None, kid_factor = None, num_iter = 1, final_adjust_rots = True, initial_pose_rotvecs = None, scale_fit = False, requested_keys = None)

      Fits the body model pose and translation to target vertices and optionally target joints,
      given known shape parameters (betas).

      The method assumes the shape parameters (betas) are known and optimizes the pose and
      translation to fit the target vertices and joints. Initial pose rotations can
      optionally be provided to warm-start the optimization process.

      :param shape_betas: Shape parameters (betas) for the body model, shaped as (batch_size,
                          num_betas).
      :param target_vertices: Target mesh vertices to fit, shaped as (batch_size, num_vertices, 3).
      :param target_joints: Optional target joint positions, shaped as (batch_size, num_joints, 3).
      :param vertex_weights: Optional importance weights for individual vertices during the
                             fitting process.
      :param joint_weights: Optional importance weights for individual joints during the fitting
                            process.
      :param kid_factor: Optional adjustment factor for kid shapes, shaped as (batch_size, 1).
      :param num_iter: Number of iterations for the optimization process.
      :param final_adjust_rots: Whether to refine body part orientations after fitting for better
                                alignment.
      :param initial_pose_rotvecs: Optional initial pose rotations in rotation vector format,
                                   shaped as (batch_size, num_joints * 3).
      :param scale_fit: Whether to estimate a scale factor to align the fitted mesh with the
                        target vertices.
      :param requested_keys: List of result keys to return.

      :returns:

                Dictionary
                    - **pose_rotvecs** -- Estimated pose rotation vectors in concatenated format.
                    - **trans** -- Estimated translation parameters.
                    - **joints** -- Fitted joint positions, if requested.
                    - **vertices** -- Fitted mesh vertices, if requested.
                    - **orientations** -- Global body part orientations as rotation matrices.
                    - **relative_orientations** -- Parent-relative body part orientations as rotation                     matrices.
                    - **kid_factor** -- Estimated kid blendshape factor, if provided.
                    - **scale_corr** -- Estimated scale correction factor, if scaling is enabled.



.. footbibliography::